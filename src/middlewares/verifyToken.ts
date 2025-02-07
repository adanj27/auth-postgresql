import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../config/database";

export const addToBlacklist = async (token: string) => {
    await pool.query('INSERT INTO token_blacklist (token) VALUES ($1)', [token]);
  };
  
  export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
    const result = await pool.query('SELECT 1 FROM token_blacklist WHERE token = $1', [token]);
    return (result.rowCount ?? 0) > 0;
  };
  
  export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      res.status(401).json({ message: "Token missing" });
      return;
    }
  
    if (await isTokenBlacklisted(token)) {
      res.status(403).json({ message: "Token is blacklisted" });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.body.user = decoded;
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(403).json({ message: "Invalid token" });
    }
  };

  export const authorize = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Obtener el ID del usuario del token decodificado
            const userId = (req as any).user.id;

            // Consultar la base de datos para verificar el rol
            const roleQuery = await pool.query(
                `SELECT r.name 
                 FROM user_roles ur
                 JOIN roles r ON ur.role_id = r.id
                 WHERE ur.user_id = $1`, 
                [userId]
            );

            // Verificar si el rol coincide
            if (roleQuery.rows.length === 0 || roleQuery.rows[0].name !== role) {
                return res.status(403).json({ 
                    success: false, 
                    message: 'Access denied. Insufficient permissions.' 
                });
            }

            next();
        } catch (error) {
            console.error("Authorization error:", error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error during authorization' 
            });
        }
    };
};