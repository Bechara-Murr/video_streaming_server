import { Video } from '@/domain/entities/Video';
import { CreateVideoDTO } from '@/use_cases/dtos/video/CreateVideoDTO';

export interface VideoRepository {
  findById(id: string): Promise<Video | null>;
  findByTitle(title: string): Promise<Video | null>;
  create(video: CreateVideoDTO): Promise<Video>;
  getAllVideos(): Promise<Video[] | null>;
}
