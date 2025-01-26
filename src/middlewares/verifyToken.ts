import { Request, Response, NextFunction } from "express";
import { verifyToken as verify } from "../utils/jwt";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = verify(token);
        req.body.user = decoded; // Agrega los datos del usuario al request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
