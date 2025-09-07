import {NotificationService} from '../../application/ports/notification/NotificationService';

export class PushNotificationService implements NotificationService {
    async send(to: string, message: string): Promise<void>{
        console.log(`Sending push notification to ${to}: ${message}`);
    }
}