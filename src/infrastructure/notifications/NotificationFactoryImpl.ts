import { NotificationFactory } from '../../application/ports/notification/NotificationFactory.interface';
import { NotificationService } from '../../application/ports/notification/NotificationService.interface';
import { EmailNotificationService } from './EmailNotificationService';
import { PushNotificationService } from './PushNotificationService';

export class NotificationFactoryImpl implements NotificationFactory {
  private emailService: NotificationService;
  private pushNotificationService: PushNotificationService;

  constructor() {
    this.emailService = new EmailNotificationService();
    this.pushNotificationService = new PushNotificationService();
  }

  async send(
    channel: 'email' | 'push',
    to: string,
    message: string,
  ): Promise<void> {
    switch (channel) {
      case 'email':
        await this.emailService.send(to, message);
        break;
      case 'push':
        await this.pushNotificationService.send(to, message);
        break;
      default:
        throw new Error(`Unsupported channel: ${channel}`);
    }
    throw new Error(`Unsupported notification channel: ${channel}`);
  }

  getEmailService(): NotificationService {
    return this.emailService;
  }

  getPushNotificationService(): NotificationService {
    return this.pushNotificationService;
  }
}
