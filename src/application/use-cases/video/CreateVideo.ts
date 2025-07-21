import { Video } from '@/domain/entities/Video';
import { isValidFileType } from '../../../domain/validators/video-type-validator';
import { CreateVideoDTO } from '@/use_cases/dtos/video/CreateVideoDTO';
import { VideoRepository } from '@/use_cases/ports/video/VideoRepository.interface';
import { Result } from '../../shared/Result';

export class CreateVideo {
  constructor(private readonly videoRepository: VideoRepository) {}

  async execute(input: CreateVideoDTO): Promise<Result<Video>> {
    try {
      isValidFileType(input.fileType);

      const existing = await this.videoRepository.findByTitle(input.title);
      if (existing) {
        return Result.fail('Title already in use.');
      }

      const video: Video = await this.videoRepository.create(input);

      return Result.ok(video);
    } catch (err) {
      return Result.fail(`Unexpected error during user creation ${err}.`);
    }
  }
}
