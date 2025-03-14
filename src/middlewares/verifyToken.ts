import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';

export const addToBlacklist = async (token: string) => {
  await pool.query('INSERT INTO token_blacklist (token) VALUES ($1)', [token]);
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  const result = await pool.query(
    'SELECT 1 FROM token_blacklist WHERE token = $1',
    [token]
  );
  return (result.rowCount ?? 0) > 0;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.header('Access-Control-Allow-Origin', 'https://frontprueba-seven.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(401).json({ message: 'Token missing' });
    return;
  }

  if (await isTokenBlacklisted(token)) {
    res.header('Access-Control-Allow-Origin', 'https://frontprueba-seven.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(403).json({ message: 'Token is blacklisted' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.header('Access-Control-Allow-Origin', 'https://frontprueba-seven.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(403).json({ message: 'Invalid token' });
  }
};

export const authorize = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;

    if (!userId) {
      res.header('Access-Control-Allow-Origin', 'https://frontprueba-seven.vercel.app');
      res.header('Access-Control-Allow-Credentials', 'true');
      return res
        .status(403)
        .json({ success: false, message: 'User ID not found in token.' });
    }

    try {
      // Obtener el nombre del rol del usuario en una sola consulta
      const query = `
          SELECT r.name 
          FROM profiles p
          JOIN roles r ON p.role_id = r.id
          WHERE p.user_id = $1
        `;
      const result = await pool.query(query, [userId]);

      if (result.rows.length === 0) {
        res.header('Access-Control-Allow-Origin', 'https://frontprueba-seven.vercel.app');
        res.header('Access-Control-Allow-Credentials', 'true');
        return res
          .status(403)
          .json({ success: false, message: 'User has no assigned role.' });
      }

      const userRole = result.rows[0].name;

      if (userRole !== requiredRole) {
        res.header('Access-Control-Allow-Origin', 'https://frontprueba-seven.vercel.app');
        res.header('Access-Control-Allow-Credentials', 'true');
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
      res.header('Access-Control-Allow-Origin', 'https://frontprueba-seven.vercel.app');
      res.header('Access-Control-Allow-Credentials', 'true');
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };
};
