import { Request, Response } from 'express';
import { pool } from '../config/database';

// Obtener lista de usuarios (con filtro opcional por nombre)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    const { search } = req.query;

    try {
        let query = 'SELECT id, username, email, registered_at FROM users';
        const params = [];

        if (search) {
            query += ' WHERE username ILIKE $1';
            params.push(`%${search}%`);
        }

        const result = await pool.query(query, params);

        if (result.rows.length === 0) {
            res.status(404).json({ success: false, message: 'No users found' });
        } else {
            res.json({ success: true, users: result.rows });
        }
    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
