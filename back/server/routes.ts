import { Application } from 'express';
import { Pool } from 'pg';
import examplesRouter from './api/controllers/examples/router';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nozomi',
  password: 'postgres',
  port: 5432,
});

export default function routes(app: Application): void {
  app.use('/Y/examples', examplesRouter);
}
