import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Token missing" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body.user = decoded; // Adjuntar usuario al cuerpo de la solicitud.
        next(); // Continuar con la siguiente función.
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