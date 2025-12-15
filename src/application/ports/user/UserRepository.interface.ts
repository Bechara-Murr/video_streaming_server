import { User } from '@/domain/entities/User/User';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  createAccessToken(input: {
    accessToken: string;
    userId: string;
    expiresAt: Date;
    isValid?: boolean;
  }): Promise<void>;
}
