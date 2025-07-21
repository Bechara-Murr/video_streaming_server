import { Router } from 'express';
import { TypeOrmVideoRepository } from '../../db/repositories/TypeOrmVideoRepository';
import { CreateVideo } from '../../../application/use-cases/video/CreateVideo';
import { GetAllVideos } from '../../../application/use-cases/video/GetAllVideos';
import { VideoController } from '../../../adapters/controllers/video.controller';

const router = Router();

const repo = new TypeOrmVideoRepository();

// Wire up dependencies
const createVideo = new CreateVideo(repo);
const getAllVideos = new GetAllVideos(repo);
const videoController = new VideoController(createVideo, getAllVideos);

// Route definitions
router.post('/', (req, res) => videoController.create(req, res));
router.get('/', (req, res) => videoController.getAllVids(req, res));

export { router as videosRouter };
