import {NotificationService} from '../../application/ports/notification/NotificationService';

export class EmailNotificationService implements NotificationService {
    async send(to: string, message: string): Promise<void>{
        console.log(`Sending email to ${to}: ${message}`);
    }
}