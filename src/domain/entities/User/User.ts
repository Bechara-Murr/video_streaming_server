import { isValidId } from '../../validators/general-type-validator';
import {
  isPasswordSafe,
  isValidEmail,
} from '../../validators/user-type-validator';

export class User {
  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public dateOfBirth: Date,
    public isVerified: boolean,
    public phoneNumber: string,
  ) {
    if (!isValidId(id)) {
      throw new Error(`The id is not a valid UUID.`);
    }
    if (!isValidEmail(email)) {
      throw new Error(`Please enter a valid email.`);
    }
    if (!isPasswordSafe(password)) {
      throw new Error(
        `Password should consist of at least 8 characters, 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character.`,
      );
    }
  }
}
