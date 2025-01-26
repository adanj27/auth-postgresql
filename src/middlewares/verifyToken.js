"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.user = decoded; // Adjuntar usuario al cuerpo de la solicitud.
        next(); // Continuar con la siguiente función.
    }
    catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};
exports.verifyToken = verifyToken;
