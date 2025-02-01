import { Request, Response } from 'express';
import { pool } from '../config/database';

// Obtener lista de usuarios (con filtro opcional por nombre)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.query;
        let query = 'SELECT id, username, email, registered_at FROM users';
        const params: any[] = [];

        if (search) {
            query += ' WHERE username ILIKE $1';
            params.push(`%${search}%`);
        }

        const result = await pool.query(query, params);
        res.json({ success: true, users: result.rows });
    } catch (error: any) {
        console.error('Error en getUsers:', error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};
