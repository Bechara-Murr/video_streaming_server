import { NotificationFactory } from '../../application/ports/notification/NotificationFactory.interface';
import { NotificationService } from '../../application/ports/notification/NotificationService.interface';
import { EmailNotificationService } from './EmailNotificationService';
import { PushNotificationService } from './PushNotificationService';

export class NotificationFactoryImpl implements NotificationFactory {
  create(channel: 'email' | 'push'): NotificationService {
    if (channel === 'email') {
      return new EmailNotificationService();
    }
    if (channel === 'push') {
      return new PushNotificationService();
    }
    throw new Error(`Unsupported notification channel: ${channel}`);
  }
}
