import { AuthenticationController } from '@/adapters/controllers/authentication.controller';
import { TypeOrmUserRepository } from '@/infrastructure/db/repositories/TypeOrmUserRepository';
import { CreateUser } from '@/use_cases/use-cases/authentication/CreateUser';
import { Router } from 'express';
import { NotificationFactory } from '../../../application/ports/notification/NotificationFactory.interface';

// TODO: Add middleware to verify token
export function buildAuthRouter(notificationFactory: NotificationFactory) {
  const authRouter = Router();
  const userRepo = new TypeOrmUserRepository();

  const createUser = new CreateUser(userRepo);

  const authController = new AuthenticationController(createUser);

  authRouter.post('/signup', (req, res) => authController.create(req, res));

  return authRouter;
}
