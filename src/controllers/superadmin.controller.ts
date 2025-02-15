import { Request, Response } from "express";
import { pool } from "../config/database";

// Cambiar el rol de un usuario (solo para superadmin)
export const changeUserRole = async (req: Request, res: Response): Promise<void> => {
    const { userId, newRole } = req.body;

    // Roles permitidos
    const allowedRoles = ["user", "admin", "superadmin"];

    try {
        // Verificar si el nuevo rol es válido
        if (!allowedRoles.includes(newRole)) {
            res.status(400).json({ success: false, message: "Invalid role" });
            return;
        }

        // Obtener el ID del rol
        const roleResult = await pool.query("SELECT id FROM roles WHERE name = $1", [newRole]);

        if (roleResult.rows.length === 0) {
            res.status(400).json({ success: false, message: "Role not found" });
            return;
        }

        const roleId = roleResult.rows[0].id;

        // Actualizar el rol del usuario en profiles
        const updateResult = await pool.query("UPDATE profiles SET role_id = $1 WHERE user_id = $2", [roleId, userId]);

        if (updateResult.rowCount === 0) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.json({ success: true, message: "User role changed successfully" });
    } catch (error: any) {
        console.error("Error in changeUserRole:", error);

        // Manejo específico para errores de base de datos
        if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
            res.status(502).json({ 
                success: false, 
                message: "Database connection error", 
                details: error.message 
            });
        } else {
            // Otros errores
            res.status(500).json({ 
                success: false, 
                message: "Internal server error", 
                details: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
            });
        }
    }
};