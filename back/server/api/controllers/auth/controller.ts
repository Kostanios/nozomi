import { Request, Response } from 'express';
import bcrypt from "bcrypt-ts";
import { pool } from "../../../routes";

export class AuthController {
    async reg(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);

            res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
export default new AuthController();