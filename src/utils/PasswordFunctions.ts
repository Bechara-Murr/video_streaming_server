const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


export async function hashPassword(plainPassword: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, SALT_ROUNDS, (err: Error, hash: string) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
}


export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashedPassword, (err: Error, result: boolean) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}