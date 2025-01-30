import { Request, Response } from 'express';
import { pool } from '../config/database';

// Cambiar el rol de un usuario (solo para superadmin)
export const changeUserRole = async (req: Request, res: Response): Promise<void> => {
    const { userId, newRole } = req.body;

    // Roles predefinidos
    const allowedRoles = ['user', 'admin', 'superadmin'];

    try {
        // Verificar si el nuevo rol es válido
        if (!allowedRoles.includes(newRole)) {
            res.status(400).json({ success: false, message: 'Invalid role' });
            return;
        }

        // Verificar si el rol existe
        const roleResult = await pool.query('SELECT id FROM roles WHERE name = $1', [newRole]);
        if (roleResult.rows.length === 0) {
            res.status(400).json({ success: false, message: 'Role not found' });
            return;
        }

        const roleId = roleResult.rows[0].id;

        // Cambiar el rol del usuario
        await pool.query('UPDATE user_roles SET role_id = $1 WHERE user_id = $2', [roleId, userId]);

        res.json({ success: true, message: 'User role changed successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};