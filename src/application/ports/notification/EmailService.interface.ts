export interface EmailService {
  sendEmail(params: {
    to: string;
    subject: string;
    body: string;
  }): Promise<void>;
}
