// auth-postgresql/src/middlewares/sanitizeInput.ts
import { Request, Response, NextFunction } from 'express';
import sanitize from 'sanitize-html';

export const sanitizeInput = (req: Request, res: Response, next: NextFunction): void => {
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      req.body[key] = sanitize(req.body[key]);
    }
  }
  next();
};