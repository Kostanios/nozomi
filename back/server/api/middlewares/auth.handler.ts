import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import process from 'process';

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
