import { Router } from 'express';
import { buildVideoRouter } from './videos.routes';
import { NotificationFactory } from '../../../application/ports/notification/NotificationFactory.interface';
import { buildAuthRouter } from './auth.routes';

export function buildAppRouter(
  notificationFactory: NotificationFactory,
): Router {
  const router = Router();

  router.use('/videos', buildVideoRouter());
  router.use('/auth', buildAuthRouter(notificationFactory));

  return router;
}
