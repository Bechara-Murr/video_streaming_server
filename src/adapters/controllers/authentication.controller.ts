import { CreateUser } from '@/use_cases/use-cases/authentication/CreateUser';
import { Request, Response } from 'express';
import { UserPresenter } from '../presenters/UserPresenter';

export class AuthenticationController {
  constructor(private readonly createUser: CreateUser) {}

  async create(req: Request, res: Response) {
    const result = await this.createUser.execute({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      dateOfBirth: req.body.dateOfBirth,
      googleToken: req.body.googleToken,
      appleToken: req.body.appleToken,
    });

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    if (!result.data) {
      return res.status(500).json({ error: result.error });
    }

    return res.status(201).json(UserPresenter.toHttp(result.data));
  }
}
