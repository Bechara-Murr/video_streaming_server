import {
  wrongEmailFormat,
  unsafePassword,
  wronUUIDFormat,
  invalidPhoneNumber,
} from '../../../utils/globals/errorMessages';
import { User } from './User';

describe('user entity test', () => {
  it('Pass new User creation when id, email and password are valid', () => {
    const user = new User(
      '38f7c85c-c40e-473c-9cb1-e43c80771242',
      'John',
      'Doe',
      'john.doe@example.com',
      '+01000000',
      'SafePassword1!',
      new Date('01-07-1990'),
      new Date('23-03-2023'),
      new Date(),
      false,
      null,
      new Date(),
      null,
      null,
    );

    expect(user).toBeInstanceOf(User);
  });

  it('Should throw error when id is invalid', () => {
    expect(
      () =>
        new User(
          '38f7c85c-c40e-473c-9cb1-e43c807',
          'John',
          'Doe',
          'john.doe@example.com',
          '+01000000',
          'SafePassword1!',
          new Date('01-07-1990'),
          new Date('23-03-2023'),
          new Date(),
          false,
          null,
          new Date(),
          null,
          null,
        ),
    ).toThrow(new Error(wronUUIDFormat));
  });

  it('Should throw error when email is invalid', () => {
    expect(
      () =>
        new User(
          '38f7c85c-c40e-473c-9cb1-e43c80771242',
          'John',
          'Doe',
          'john.doe@exampleom',
          '+01000000',
          'SafePassword1!',
          new Date('01-07-1990'),
          new Date('23-03-2023'),
          new Date(),
          false,
          null,
          new Date(),
          null,
          null,
        ),
    ).toThrow(new Error(wrongEmailFormat));
  });

  it('Should throw error when password is not safe', () => {
    expect(
      () =>
        new User(
          '38f7c85c-c40e-473c-9cb1-e43c80771242',
          'John',
          'Doe',
          'john.doe@example.com',
          '+01000000',
          'SafePassword1',
          new Date('01-07-1990'),
          new Date('23-03-2023'),
          new Date(),
          false,
          null,
          new Date(),
          null,
          null,
        ),
    ).toThrow(new Error(unsafePassword));
  });

  it('Should throw error when phone number is not correct', () => {
    expect(
      () =>
        new User(
          '38f7c85c-c40e-473c-9cb1-e43c80771242',
          'John',
          'Doe',
          'john.doe@example.com',
          '01000',
          'SafePassword1!',
          new Date('01-07-1990'),
          new Date('23-03-2023'),
          new Date(),
          false,
          null,
          new Date(),
          null,
          null,
        ),
    ).toThrow(new Error(invalidPhoneNumber));
  });
});
