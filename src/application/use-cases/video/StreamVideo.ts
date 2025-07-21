import { Video } from '@/domain/entities/Video';
import { VideoRepository } from '@/use_cases/ports/video/VideoRepository.interface';
import { Result } from '../../shared/Result';

export class StreamVideo {
  constructor(private readonly videoRepository: VideoRepository) {}

  execute() {}
}
