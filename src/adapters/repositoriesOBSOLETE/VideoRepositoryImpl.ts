import { Video } from '@/domain/entities/Video';
import { VideoRepository } from '@/use_cases/ports/video/VideoRepository.interface';

export class VideoRepositoryImpl implements VideoRepository {
  private videos: Video[] = []; // Temporary mock DB

  async create(video: Video): Promise<Video> {
    //TODO: Manage Create Video here
    // this.users.push(user);
    return {
      id: video.id,
      title: video.title,
      description: video.description,
      active: video.active,
      minAgeAppropriate: video.minAgeAppropriate,
      path: video.path,
      length: video.length,
      fileType: video.fileType,
      genre: video.genre,
    };
  }

  async findById(id: string): Promise<Video | null> {
    return this.videos.find((u) => u.id === id) ?? null;
  }

  async findByTitle(title: string): Promise<Video | null> {
    return this.videos.find((u) => u.title === title) ?? null;
  }

  async getAllVideos(): Promise<Video[] | null> {
    return this.videos ?? [];
  }
}
