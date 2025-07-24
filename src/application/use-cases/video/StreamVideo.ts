import { createReadStream, statSync } from 'fs';
import { tmpdir } from 'os';
import path, { join } from 'path';

interface StreamVideoInput {
  videoPath: string;
  rangeHeader: string | undefined;
}

interface StreamVideoOutput {
  stream: ReturnType<typeof createReadStream>;
  headers: Record<string, string>;
  statusCode: number;
}

export class StreamVideo {
  async execute({
    videoPath,
    rangeHeader,
  }: StreamVideoInput): Promise<StreamVideoOutput> {
    const filePath = path.resolve(join(tmpdir(), `${videoPath}`));
    const fileStat = statSync(filePath);
    const fileSize = fileStat.size;

    if (!rangeHeader) {
      return {
        statusCode: 200,
        headers: {
          'Content-Length': fileSize.toString(),
          'Content-Type': 'video/mp4',
        },
        stream: createReadStream(filePath),
      };
    }

    const CHUNK_SIZE = 10 ** 6; //Equals 1 Mb
    const [startStr, endStr] = rangeHeader.replace(/bytes=/, '').split('-');
    const start = parseInt(startStr, 10);
    const end = endStr
      ? parseInt(endStr, 10)
      : Math.min(start + CHUNK_SIZE, fileSize - 1);

    const contentLength = end - start + 1;
    const stream = createReadStream(filePath, { start, end });

    return {
      stream,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength.toString(),
        'Content-Type': 'video/mp4',
      },
      statusCode: 206,
    };
  }
}
