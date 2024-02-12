import { Request, Response } from 'express';

import L from '../../../common/logger';
import { pool } from '../../../routes';

export class UsersController {
  async getCurrentUser(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId: string = req.user.user_id;

      const medicationResult = await pool.query(
        'SELECT username FROM "User" WHERE id = $1',
        [userId]
      );

      const user = medicationResult.rows[0];

      L.info(user, 'Get current User');

      return res.status(200).json(user);
    } catch (error) {
      L.error(error, 'Error: Get current User');
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
export default new UsersController();
