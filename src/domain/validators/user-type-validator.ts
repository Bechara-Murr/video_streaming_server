import {
  emailRegex,
  safePasswordRegex,
} from '../../utils/globals/regexExpressions';

export function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

export function isPasswordSafe(password: string): boolean {
  return safePasswordRegex.test(password);
}
