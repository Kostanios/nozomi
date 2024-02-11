import { Application, Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

import authRouter from './api/controllers/auth/router';
import medicationRouter from './api/controllers/medication/router';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
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

  jwt.verify(token, 'your_secret_key', (err, user) => {
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
  app.use('/', authRouter);
  app.use(authenticateToken);
  app.use('/medications', medicationRouter);
}
