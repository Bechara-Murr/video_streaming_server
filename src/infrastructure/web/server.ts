import express from 'express';
import { AppDataSource } from '../db/data-source';
import { join } from 'path';
import { NotificationFactoryImpl } from '../notifications/NotificationFactoryImpl';
import { buildAppRouter } from './routes';

const notificationFactory = new NotificationFactoryImpl();

const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.use(buildAppRouter(notificationFactory));

AppDataSource.initialize().then(() => {
  console.log('DB connected');
  app.listen(3000, () => console.log('Server running on port 3000'));
});

export { app };
