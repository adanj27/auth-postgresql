import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../config/database";

export const addToBlacklist = async (token: string) => {
    await pool.query('INSERT INTO token_blacklist (token) VALUES ($1)', [token]);
  };
  
  export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
    const result = await pool.query('SELECT 1 FROM token_blacklist WHERE token = $1', [token]);
    return result.rowCount > 0;
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
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req as any).user.role;
        if (userRole !== role) {
            res.status(403).json({ success: false, message: 'Access denied. Insufficient permissions.' });
            return;
        }
        next();
    };
};