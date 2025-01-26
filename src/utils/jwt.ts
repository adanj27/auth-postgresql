import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

if (!JWT_SECRET) {
    throw new Error("La variable de entorno JWT_SECRET es obligatoria.");
}

if (!JWT_EXPIRES_IN) {
    throw new Error("La variable de entorno JWT_EXPIRES_IN es obligatoria.");
}

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): object => {
    try {
        return jwt.verify(token, JWT_SECRET as string);
    } catch {
        throw new Error("Token inválido o expirado.");
    }
};
