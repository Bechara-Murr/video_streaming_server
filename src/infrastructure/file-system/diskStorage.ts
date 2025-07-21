import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';

export class DiskStorage {
  static async saveFile(
    fileStream: NodeJS.ReadableStream,
    filename: string,
  ): Promise<string> {
    const uploadPath = path.join(__dirname, '..', '..', 'uploads', filename);

    await fs.promises.mkdir(path.dirname(uploadPath), { recursive: true });

    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(uploadPath);
      pipeline(fileStream, writeStream, (err) => {
        if (err) return reject(err);
        resolve(uploadPath);
      });
    });
  }
}
