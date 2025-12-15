import { isValidId } from '../../validators/general-type-validator';
import {
  isPasswordSafe,
  isValidEmail,
  isPhoneNumberSafe,
} from '../../validators/user-type-validator';
import {
  wrongEmailFormat,
  unsafePassword,
  wronUUIDFormat,
  invalidPhoneNumber,
} from '../../../utils/globals/errorMessages';

export class User {
  constructor(
    private readonly id: string | null,
    private firstName: string,
    private lastName: string,
    private email: string,
    private phoneNumber: string,
    private password: string | null,
    private dateOfBirth: Date,
    private readonly createdAt: Date,
    private lastModifiedAt: Date,
    private isVerified: boolean,
    private verificationCode: string | null,
    private verificationExpiry: Date,
    private googleToken: string | null,
    private appleToken: string | null,
  ) {
    if (id && !isValidId(id)) {
      throw new Error(wronUUIDFormat);
    }
    if (!isValidEmail(email)) {
      throw new Error(wrongEmailFormat);
    }
    if (password && !isPasswordSafe(password)) {
      throw new Error(unsafePassword);
    }
    if (!isPhoneNumberSafe(phoneNumber)) {
      throw new Error(invalidPhoneNumber);
    }
  }

  getId(): string | null {
    return this.id;
  }
  getFirstName(): string {
    return this.firstName;
  }
  getLastName(): string {
    return this.lastName;
  }
  getEmail(): string {
    return this.email;
  }
  getPhoneNumber(): string {
    return this.phoneNumber;
  }
  getPassword(): string | null {
    return this.password;
  }
  getDateOfBirth(): Date {
    return this.dateOfBirth;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getLastModifiedAt(): Date {
    return this.lastModifiedAt;
  }
  getIsVerified(): boolean {
    return this.isVerified;
  }
  getVerificationCode(): string | null {
    return this.verificationCode;
  }
  getVerificationExpiry(): Date {
    return this.verificationExpiry;
  }
  getGoogleToken(): string | null {
    return this.googleToken;
  }
  getAppleToken(): string | null {
    return this.appleToken;
  }
}
