import { User } from '@/domain/entities/User/User';
import { UserRepository } from '@/use_cases/ports/user/UserRepository.interface';
import { hashPassword } from 'src/utils/PasswordFunctions';
import { DeepPartial, Repository } from 'typeorm';
import { UserOrm } from '../entities/User.orm';

export class TypeOrmUserRepository implements UserRepository {
  private readonly ormRepo: Repository<UserOrm>;
  constructor() {}

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.ormRepo.findOne({ where: { email } });
    if (!record) return null;

    return new User(
      record.id,
      record.firstName,
      record.lastName,
      record.email,
      record.phoneNumber,
      record.password,
      record.dateOfBirth,
      record.createdAt,
      record.lastModifiedAt,
      record.isVerified,
      record.verificationCode,
      record.verificationCodeExpirationTime,
      record.googleToken,
      record.appleToken,
    );
  }

  async create(user: User): Promise<User> {
    const hash = await hashPassword(user.getPassword() || '');
    const data: DeepPartial<UserOrm> = {
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber(),
      password: user.getPassword() !== null ? hash : undefined,
      dateOfBirth: user.getDateOfBirth(),
      createdAt: user.getCreatedAt(),
      lastModifiedAt: user.getLastModifiedAt(),
      isVerified: user.getIsVerified(),
      verificationCode: user.getVerificationCode() || undefined,
      verificationCodeExpirationTime: user.getVerificationExpiry() || undefined,
      googleToken: user.getGoogleToken() || undefined,
      appleToken: user.getAppleToken() || undefined,
    };
    const ormUser = this.ormRepo.create(data);
    const saved = await this.ormRepo.save(ormUser);
    return new User(
      saved.id,
      saved.firstName,
      saved.lastName,
      saved.email,
      saved.phoneNumber,
      saved.password,
      saved.dateOfBirth,
      saved.createdAt,
      saved.lastModifiedAt,
      saved.isVerified,
      saved.verificationCode,
      saved.verificationCodeExpirationTime,
      saved.googleToken,
      saved.appleToken,
    );
  }

  async createAccessToken(input: {
    accessToken: string;
    userId: string;
    expiresAt: Date;
    isValid?: boolean;
  }): Promise<void> {
    // const row = this.accessTokenRepo.create({
    //   token: input.accessToken,
    //   user: { id: input.userId } as { id: string },
    //   expiresAt: input.expiresAt,
    //   isValid: input.isValid ?? true,
    // });
    // await this.accessTokenRepo.save(row);
  }
}
