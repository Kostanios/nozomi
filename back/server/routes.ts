import { Application } from 'express';
import { Pool } from 'pg';
import * as process from 'process';
import cors from 'cors';

import authRouter from './api/controllers/auth/router';
import medicationRouter from './api/controllers/medication/router';
import usersRouter from './api/controllers/users/router';
import authenticateToken from './api/middlewares/auth.handler';

export const pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_HOST,
  database: 'nozomi',
  password: 'postgres',
  port: 5432,
});

export default function routes(app: Application): void {
  app.use(cors({ origin: process.env.ORIGIN }));
  app.use('/', authRouter);
  app.use(authenticateToken);
  app.use('/api/medications', medicationRouter);
  app.use('/api/users', usersRouter);
}
