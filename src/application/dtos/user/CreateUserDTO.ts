export type CreateUserDTO = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string | null;
  confirmPassword: string | null;
  dateOfBirth: Date;
  googleToken: string | null;
  appleToken: string | null;
};
