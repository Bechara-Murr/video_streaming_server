import { Video } from '@/domain/entities/Video';
import { VideoDataDTO } from '../dtos/VideoDataDTO';

export class VideoPresenter {
  static toHttp(video: Video): VideoDataDTO {
    return {
      title: video.title,
      description: video.description,
      minAgeAppropriate: video.minAgeAppropriate,
      fileType: video.fileType,
      genre: video.genre,
      length: video.length,
      path: video.path,
    };
  }
}
