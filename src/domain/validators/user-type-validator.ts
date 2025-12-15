import {
  emailRegex,
  safePasswordRegex,
  phoneNumberRegex,
} from '../../utils/globals/regexExpressions';

export function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

export function isPasswordSafe(password: string): boolean {
  return safePasswordRegex.test(password);
}

export function isPhoneNumberSafe(phoneNumber: string): boolean {
  return phoneNumberRegex.test(phoneNumber);
}
