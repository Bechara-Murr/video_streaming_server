import { NotificationService } from './NotificationService.interface';

export interface NotificationFactory {
  send(
    channel: 'email' | 'push',
    to: string,
    subject: string,
    message: string,
  ): Promise<void>;
  getEmailService(): NotificationService;
  getPushNotificationService(): NotificationService;
}
