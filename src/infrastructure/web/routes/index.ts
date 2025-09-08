import { Router } from 'express';
import { buildVideoRouter } from './videos.routes';
import { NotificationFactory } from '../../../application/ports/notification/NotificationFactory.interface';

export function buildAppRouter(
  notificationFactory: NotificationFactory,
): Router {
  const router = Router();

  router.use('/videos', buildVideoRouter());

  return router;
}
