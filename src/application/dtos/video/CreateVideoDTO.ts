import { Genre } from '@/domain/entities/Video/Genre';

export type CreateVideoDTO = {
  title: string;
  description: string;
  active: boolean;
  minAgeAppropriate: number;
  path: string;
  length: string;
  fileType: string;
  genre: Genre;
};
