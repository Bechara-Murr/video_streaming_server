import { isValidFileType } from '../validators/video-type-validator';
import { Genre } from './Genre';

export class Video {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public active: boolean,
    public minAgeAppropriate: number,
    public path: string,
    public length: string,
    public fileType: string,
    public genre: Genre,
  ) {
    if (!isValidFileType(fileType)) {
      throw new Error(`${fileType} files are not allowed`);
    }
  }
}
