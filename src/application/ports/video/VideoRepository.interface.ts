import { Video } from '@/domain/entities/Video';
import { CreateVideoDTO } from '@/use_cases/dtos/video/CreateVideoDTO';
import { Result } from '@/use_cases/shared/Result';

export interface VideoRepository {
  findById(id: string): Promise<Video | null>;
  findByTitle(title: string): Promise<Video | null>;
  create(video: CreateVideoDTO): Promise<Video>;
  getAllVideos(): Promise<Video[] | null>;
  getVideoPathById(videoId: string): Promise<string>;
  streamVideo(): Promise<null>;
  deleteVideo(id: string): Promise<boolean>;
}
