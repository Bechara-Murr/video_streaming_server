import express from 'express';
import { videosRouter } from './routes/videos.routes';
import { AppDataSource } from '../db/data-source';
import { join } from 'path';

const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.use('/videos', videosRouter);

AppDataSource.initialize().then(() => {
  console.log('DB connected');
  app.listen(3000, () => console.log('Server running on port 3000'));
});

export { app };
