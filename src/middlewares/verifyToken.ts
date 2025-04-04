import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';

export const addToBlacklist = async (token: string) => {
  await pool.query('INSERT INTO blacklist (token) VALUES ($1)', [token]);
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  const result = await pool.query(
    'SELECT 1 FROM blacklist WHERE token = $1',
    [token]
  );
  return (result.rowCount ?? 0) > 0;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token missing' });
      return;
    }

    if (await isTokenBlacklisted(token)) {
      res.status(403).json({ message: 'Token is blacklisted' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded; 
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
};

export const authorize = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res
        .status(403)
        .json({ success: false, message: 'User ID not found in token.' });
    }

    try {
      const query = `
          SELECT r.name 
          FROM profiles p
          JOIN roles r ON p.role_id = r.id
          WHERE p.user_id = $1
        `;
      const result = await pool.query(query, [userId]);

      if (result.rows.length === 0) {
        return res
          .status(403)
          .json({ success: false, message: 'User has no assigned role.' });
      }

      const userRole = result.rows[0].name;

      if (userRole !== requiredRole) {
        return res
          .status(403)
          .json({
            success: false,
            message: 'Access denied. Insufficient permissions.',
          });
      }

      next();
    } catch (error) {
      console.error('Error checking user role:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };
};
