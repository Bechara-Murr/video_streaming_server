import { Genre } from '../../../domain/entities/Genre';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('videos')
export class VideoOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false, unique: true })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @Column({ nullable: false })
  minAgeAppropriate: number;

  @Column({ nullable: false })
  path: string;

  @Column({ nullable: false })
  length: string;

  @Column({ length: 10, nullable: false })
  fileType: string;

  @Column({ type: 'enum', enum: Genre, nullable: false })
  genre: Genre;
}
