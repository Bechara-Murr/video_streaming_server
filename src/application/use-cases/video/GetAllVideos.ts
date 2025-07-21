import { Video } from '@/domain/entities/Video';
import { VideoRepository } from '@/use_cases/ports/video/VideoRepository.interface';
import { Result } from '../../shared/Result';

export class GetAllVideos {
  constructor(private readonly videoRepository: VideoRepository) {}

  async execute(): Promise<Result<Video[]>> {
    try {
      const videos: Video[] | null = await this.videoRepository.getAllVideos();
      if (!videos) return Result.fail(`Unknown error during user fetching.`);

      return Result.ok(videos);
    } catch (err) {
      return Result.fail(`Unexpected error during user fetching ${err}.`);
    }
  }
}
