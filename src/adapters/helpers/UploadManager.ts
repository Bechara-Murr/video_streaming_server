import { IncomingMessage } from 'http';
import { createWriteStream } from 'fs';
// import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

export class UploadManager {
  static async handleVideoUpload(req: IncomingMessage): Promise<{
    fields: Record<string, string>;
    filePath: string;
    fileType: string;
  }> {
    return new Promise((resolve, reject) => {
      const contentType = req.headers['content-type'];
      if (!contentType?.includes('multipart/form-data')) {
        return reject(new Error('Invalid content-type'));
      }

      const boundaryMatch = contentType.match(/boundary=(.+)$/);
      if (!boundaryMatch) return reject(new Error('Boundary not found'));
      const boundary = `--${boundaryMatch[1]}`;

      let buffer = '';
      const fields: Record<string, string> = {};
      let fileStream: ReturnType<typeof createWriteStream> | null = null;
      let filePath = '';
      let fileType = '';
      let currentField = '';
      let isFile = false;

      req.setEncoding('binary');

      req.on('data', (chunk) => {
        buffer += chunk;

        let boundaryIndex;
        while ((boundaryIndex = buffer.indexOf(boundary)) >= 0) {
          const part = buffer.slice(0, boundaryIndex);
          buffer = buffer.slice(boundaryIndex + boundary.length);

          if (part.includes('filename=')) {
            // File header
            const nameMatch = part.match(/name="(.+?)"/);
            const filenameMatch = part.match(/filename="(.+?)"/);
            const contentTypeMatch = part.match(/Content-Type: (.+?)\r\n/);

            const name = nameMatch?.[1];
            const filename = filenameMatch?.[1];
            fileType = contentTypeMatch?.[1] || '';

            if (!name || !filename) continue;

            isFile = true;
            const ext = filename.split('.').pop() || 'bin';
            filePath = join('', `${randomUUID()}.${ext}`);
            fileStream = createWriteStream(filePath);

            const start = part.indexOf('\r\n\r\n') + 4;
            const fileContent = part.slice(start);
            fileStream.write(fileContent, 'binary');
          } else {
            // Field
            const nameMatch = part.match(/name="(.+?)"/);
            const name = nameMatch?.[1];
            const value = part.split('\r\n\r\n')[1]?.trim();
            if (name && value) {
              fields[name] = value;
            }
          }

          if (fileStream) {
            fileStream.end();
          }
        }
      });

      req.on('end', () => {
        if (fileStream && !fileStream.closed) fileStream.end();
        resolve({ fields, filePath, fileType });
      });

      req.on('error', reject);
    });
  }
}
