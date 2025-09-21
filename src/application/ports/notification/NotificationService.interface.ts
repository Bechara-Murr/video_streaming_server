export interface NotificationService {
  send(to: string, subject: string, message: string): Promise<void>;
}
