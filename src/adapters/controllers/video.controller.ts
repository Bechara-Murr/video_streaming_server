import { Request, Response } from 'express';
import { CreateVideo } from '../../application/use-cases/video/CreateVideo';
import { GetAllVideos } from '../../application/use-cases/video/GetAllVideos';
import { StreamVideo } from '../../application/use-cases/video/StreamVideo';
import { VideoPresenter } from '../presenters/VideoPresenter';
import { Video } from '../../domain/entities/Video/Video';
import { VideoDataDTO } from '../dtos/VideoDataDTO';
import { UploadManager } from '../helpers/UploadManager';
import { Genre } from '@/domain/entities/Video/Genre';
import { getVideoDurationInSeconds } from 'get-video-duration';
import { toNumber, formatDuration } from '../helpers/VideoHelperFunctions';
import path, { join } from 'path';
import { DeleteVideo } from '@/use_cases/use-cases/video/DeleteVideo';
import { tmpdir } from 'os';

export class VideoController {
  constructor(
    private readonly createVideo: CreateVideo,
    private readonly getAllVideos: GetAllVideos,
    private readonly streamVideo: StreamVideo,
    private readonly deleteVideo: DeleteVideo,
  ) {}

  async create(req: Request, res: Response) {
    const { fields, filePath, fileType } =
      await UploadManager.handleVideoUpload(req);
    const duration = await getVideoDurationInSeconds(join(tmpdir(), filePath));

    const result = await this.createVideo.execute({
      title: fields.title,
      description: fields.description,
      active: fields.active?.toLowerCase() === 'true',
      minAgeAppropriate: toNumber(fields.minAgeAppropriate),
      path: filePath,
      length: formatDuration(duration),
      fileType: fileType,
      genre: fields.genre as Genre,
    });

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    if (!result.data) {
      return res.status(500).json({ error: result.error });
    }

    return res.status(201).json(VideoPresenter.toHttp(result.data));
  }

  async getAllVids(req: Request, res: Response) {
    const result = await this.getAllVideos.execute();

    if (!result.data) return res.status(400).json({ error: result.error });

    const mappedVideos: VideoDataDTO[] = result.data.map((video: Video) =>
      VideoPresenter.toHttp(video),
    );

    return res.status(200).json({ data: mappedVideos });
  }

  async stream(req: Request, res: Response) {
    try {
      const videoPath = req.params.path;
      const rangeHeader = req.headers.range;

      const result = await this.streamVideo.execute({
        videoPath,
        rangeHeader,
      });

      res.writeHead(result.statusCode, result.headers);
      result.stream.pipe(res);
    } catch (error) {
      console.log({ error });
    }
  }

  watch(req: Request, res: Response) {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'infrastructure',
      'web',
      'public',
      'index.html',
    );
    return res.sendFile(filePath);
  }

  async delete(req: Request, res: Response) {
    const videoId = req.params.id;
    console.log(1);

    await this.deleteVideo.execute(videoId);
    console.log(2);
    return res.status(200).json('Deleted Successfully');
  }
}
