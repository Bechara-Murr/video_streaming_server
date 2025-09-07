import { Router } from 'express';
import { TypeOrmVideoRepository } from '../../db/repositories/TypeOrmVideoRepository';
import { CreateVideo } from '../../../application/use-cases/video/CreateVideo';
import { GetAllVideos } from '../../../application/use-cases/video/GetAllVideos';
import { StreamVideo } from '../../../application/use-cases/video/StreamVideo';
import { VideoController } from '../../../adapters/controllers/video.controller';
import { DeleteVideo } from '../../../application/use-cases/video/DeleteVideo';
import { NotificationFactoryImpl } from '@/infrastructure/notifications/NotificationFactoryImpl';
import { NotificationFactory } from '../../../application/ports/notification/NotificationFactory.interface';

export function buildVideoRouter(notificationFactory: NotificationFactory) {
  const videosRouter = Router();
  const repo = new TypeOrmVideoRepository();

  // Wire up dependencies
  const createVideo = new CreateVideo(repo);
  const getAllVideos = new GetAllVideos(repo);
  const streamVideo = new StreamVideo();
  const deleteVideo = new DeleteVideo(repo);
  const videoController = new VideoController(
    createVideo,
    getAllVideos,
    streamVideo,
    deleteVideo,
  );

  // Route definitions
  videosRouter.post('/', (req, res) => videoController.create(req, res));
  videosRouter.get('/', (req, res) => videoController.getAllVids(req, res));
  videosRouter.get('/stream/:path', (req, res) =>
    videoController.stream(req, res),
  );
  videosRouter.get('/watch', (req, res) => videoController.watch(req, res));
  videosRouter.delete('/:id', (req, res) => videoController.delete(req, res));

  return videosRouter;
}
