import { Request, Response } from 'express';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { pool } from '../../../routes';
import { userSchema } from '../../schema/user';
import L from '../../../common/logger';

export class AuthController {
  async reg(req: Request, res: Response) {
    try {
      const { error } = userSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { username, password } = req.body;
      const hashedPassword = await hash(password, 10);

      const result = await pool.query(
        'INSERT INTO "User" (username, password) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword]
      );

      return res.status(201).json({
        message: 'User registered successfully',
        user: result.rows[0],
      });
    } catch (error) {
      L.error(error, 'Error while creating user');
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      // Retrieve user information from the users table
      const result = await pool.query(
        'SELECT * FROM "User" WHERE username = $1',
        [username]
      );
      const user = result.rows[0];

      if (!user || !(await compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ user_id: user.id }, 'your_secret_key', {
        expiresIn: '1h',
      });

      return res.json({ token, user });
    } catch (error) {
      L.error(error, 'Error while login user');
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
export default new AuthController();
