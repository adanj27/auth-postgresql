import jwt, { Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN: number = parseInt(process.env.JWT_EXPIRES_IN || "3600", 10);

export const generateToken = (payload: object): string => {
    const options: SignOptions = { 
        expiresIn: JWT_EXPIRES_IN 
    };

    return jwt.sign(payload, JWT_SECRET, options);
};