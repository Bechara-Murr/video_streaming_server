import { UserRepository } from '../../ports/user/UserRepository.interface';
import { LoginDTO } from '../../dtos/user/LoginDTO';
import { Result } from '../../shared/Result';
import { User } from '@/domain/entities/User/User';
import * as ErrorMessages from '../../../utils/globals/errorMessages';
import { verifyPassword } from 'src/utils/PasswordFunctions';
import { signAccessToken, decodeExpiry } from 'src/utils/jwt';

export class LoginUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    input: LoginDTO,
  ): Promise<Result<{ user: User; accessToken: string }>> {
    try {
      const user: User | null = await this.userRepository.findByEmail(
        input.email,
      );
      if (!user) return Result.fail(`${ErrorMessages.invalidCredentials}`);

      const hashed: string | null = user.getPassword();
      if (!hashed) return Result.fail(`${ErrorMessages.invalidCredentials}`);

      const userAuthenticated: boolean = await verifyPassword(
        input.password,
        hashed,
      );

      if (!userAuthenticated)
        return Result.fail(`${ErrorMessages.invalidCredentials}`);

      if (!user.getIsVerified()) {
        return Result.fail(`${ErrorMessages.accountNotVerified}`);
      }

      const accessToken = signAccessToken({
        id: user.getId()!,
        email: user.getEmail(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        phoneNumber: user.getPhoneNumber(),
      });

      const expiresAt = decodeExpiry(accessToken);

      await this.userRepository.createAccessToken({
        accessToken,
        userId: user.getId()!,
        expiresAt,
        isValid: true,
      });

      return Result.ok({ user, accessToken });
    } catch (error) {
      return Result.fail(`${ErrorMessages.unexpectedLoginError}: ${error}.`);
    }
  }
}
