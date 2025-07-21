import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { VideoRepository } from '@/use_cases/ports/video/VideoRepository.interface';
import { VideoOrm } from '../entities/Video.orm';
import { Video } from '../../../domain/entities/Video';

export class TypeOrmVideoRepository implements VideoRepository {
  private readonly ormRepo: Repository<VideoOrm>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(VideoOrm);
  }

  async findByTitle(title: string): Promise<Video | null> {
    const record = await this.ormRepo.findOne({ where: { title } });
    if (!record) return null;

    return new Video(
      record.id,
      record.title,
      record.description,
      record.active,
      record.minAgeAppropriate,
      record.path,
      record.length,
      record.fileType,
      record.genre,
    );
  }

  async findById(id: string): Promise<Video | null> {
    const record = await this.ormRepo.findOne({ where: { id } });
    if (!record) return null;

    return new Video(
      record.id,
      record.title,
      record.description,
      record.active,
      record.minAgeAppropriate,
      record.path,
      record.length,
      record.fileType,
      record.genre,
    );
  }

  async getAllVideos(): Promise<Video[] | null> {
    const data = await this.ormRepo.find();
    if (!data) return null;

    const mappedVideos: Video[] = data.map(
      (video: Video) =>
        new Video(
          video.id,
          video.title,
          video.description,
          video.active,
          video.minAgeAppropriate,
          video.path,
          video.length,
          video.fileType,
          video.genre,
        ),
    );

    return mappedVideos;
  }

  async create(video: Video): Promise<Video> {
    const ormUser = this.ormRepo.create({
      title: video.title,
      description: video.description,
      active: video.active,
      minAgeAppropriate: video.minAgeAppropriate,
      path: video.path,
      length: video.length,
      fileType: video.fileType,
      genre: video.genre,
    });
    return await this.ormRepo.save(ormUser);
  }
}
