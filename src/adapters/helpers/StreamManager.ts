export class StreamManager {
  static async handleVideoStreaming(): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      const message = 'This is my message to you';
      resolve({ message });
    });
  }
}
