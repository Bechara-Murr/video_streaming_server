import { UserDataDTO } from '../dtos/user/UserDataDTO';
import { User } from '../../domain/entities/User/User';

export class UserPresenter {
  static toHttp(user: User): UserDataDTO {
    return {
      email: user.getEmail(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      isVerified: user.getIsVerified(),
    };
  }
}
