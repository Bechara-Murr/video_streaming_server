import { User } from '@/domain/entities/User/User';
import { CreateUserDTO } from '@/use_cases/dtos/user/CreateUserDTO';
import { UserRepository } from '@/use_cases/ports/user/UserRepository.interface';
import { Result } from '@/use_cases/shared/Result';
import { generateCode } from 'src/utils/generateVerificationCode';
import * as ErrorMessages from '../../../utils/globals/errorMessages';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserDTO): Promise<Result<User>> {
    try {
      const existing = await this.userRepository.findByEmail(input.email);
      if (existing) return Result.fail(`${ErrorMessages.emailAlreadyExists}.`);

      if (input.password !== input.confirmPassword) {
        return Result.fail(`${ErrorMessages.passwordsMismatch}.`);
      }

      const tokenExpiry = new Date();
      tokenExpiry.setMinutes(
        new Date().getMinutes() +
          parseInt(process.env.VERIFICATION_CODE_TTL_MIN || '5', 10),
      );

      const user = new User(
        null,
        input.firstName,
        input.lastName,
        input.email,
        input.phoneNumber,
        input.password,
        input.dateOfBirth,
        new Date(),
        new Date(),
        false,
        generateCode('verification'),
        new Date(),
        input.googleToken ?? null,
        input.appleToken ?? null,
      );

      const createdUser = await this.userRepository.create(user);
      return Result.ok(createdUser);
    } catch (error) {
      return Result.fail(`Unexpected error during user creation ${error}.`);
    }
  }
}
