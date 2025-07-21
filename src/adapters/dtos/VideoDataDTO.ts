import { Genre } from '@/domain/entities/Genre';

export type VideoDataDTO = {
  title: string;
  description: string;
  minAgeAppropriate: number;
  path: string;
  length: string;
  fileType: string;
  genre: Genre;
};
