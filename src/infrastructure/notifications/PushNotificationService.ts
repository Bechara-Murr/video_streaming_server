import { NotificationService } from '../../application/ports/notification/NotificationService.interface';

export class PushNotificationService implements NotificationService {
  async send(to: string, subject: string, message: string): Promise<void> {
    console.log(`Sending push notification to ${to}: ${message}`);
  }
}
