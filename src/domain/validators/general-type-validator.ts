import { uuidRegex } from '../../utils/globals/regexExpressions';

export function isValidId(id: string): boolean {
  return uuidRegex.test(id);
}
