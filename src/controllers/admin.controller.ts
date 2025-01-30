import { Request, Response } from 'express';
import {pool} from '../config/database';

// Obtener lista de usuarios (solo para admin)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT id, username, email, registered_at FROM users');
        res.json({ success: true, users: result.rows });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Eliminar un usuario (solo para admin)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        // Eliminar el usuario
        await pool.query('DELETE FROM users WHERE id = $1', [userId]);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};