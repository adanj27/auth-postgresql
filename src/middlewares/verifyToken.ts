import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Token missing" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body.user = decoded; // Adjuntar usuario al cuerpo de la solicitud.
        next(); // Continuar con la siguiente función.
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};
