import { VideoRepository } from '@/use_cases/ports/video/VideoRepository.interface';
import { Result } from '../../shared/Result';

export class DeleteVideo {
  constructor(private readonly videoRepository: VideoRepository) {}

  async execute(id: string): Promise<Result<boolean>> {
    const res = await this.videoRepository.deleteVideo(id);
    return new Promise((resolve, reject) => {
      if (!res)
        return reject(Result.fail(`Unknown error during user deleting.`));

      return resolve(Result.ok(true));
    });
  }
}
