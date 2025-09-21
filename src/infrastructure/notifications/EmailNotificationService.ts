import { NotificationService } from '../../application/ports/notification/NotificationService.interface';
import nodemailer from 'nodemailer';
export class EmailNotificationService implements NotificationService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async send(to: string, subject: string, message: string): Promise<void> {
    await this.transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        '"Video Streaming" <no-reply@video-streamer.com>',
      to,
      subject: subject,
      html: message,
    });
  }
}
