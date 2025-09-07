import NotificationService from './NotificationService.interface';

export interface NotificationFactory {
    create(channel: 'email' | 'push'): NotificationService;
}