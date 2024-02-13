import { Application, Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import authRouter from './api/controllers/auth/router';
import medicationRouter from './api/controllers/medication/router';
import usersRouter from './api/controllers/users/router';
import * as process from 'process';

export const pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_HOST,
  database: 'nozomi',
  password: 'postgres',
  port: 5432,
});

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.SESSION_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // @ts-ignore
    req.user = user;
    return next();
  });

  return;
}

export default function routes(app: Application): void {
  app.use(cors({ origin: process.env.ORIGIN }));
  app.use('/', authRouter);
  app.use(authenticateToken);
  app.use('/api/medications', medicationRouter);
  app.use('/api/users', usersRouter);
}
