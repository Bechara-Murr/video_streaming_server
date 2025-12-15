import { DataSource } from 'typeorm';
import { VideoOrm } from './entities/Video.orm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [VideoOrm],
  subscribers: [],
  migrations: [],
});
