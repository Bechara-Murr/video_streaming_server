import { Router } from 'express';
import { TypeOrmVideoRepository } from '../../db/repositories/TypeOrmVideoRepository';
import { CreateVideo } from '../../../application/use-cases/video/CreateVideo';
import { GetAllVideos } from '../../../application/use-cases/video/GetAllVideos';
import { StreamVideo } from '../../../application/use-cases/video/StreamVideo';
import { VideoController } from '../../../adapters/controllers/video.controller';
import { DeleteVideo } from '../../../application/use-cases/video/DeleteVideo';

const router = Router();

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
router.post('/', (req, res) => videoController.create(req, res));
router.get('/', (req, res) => videoController.getAllVids(req, res));
router.get('/stream/:path', (req, res) => videoController.stream(req, res));
router.get('/watch', (req, res) => videoController.watch(req, res));
router.delete('/:id', (req, res) => videoController.delete(req, res));

export { router as videosRouter };
