import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createUser, findUserByEmail, findUserByUsername } from "../models/user.model";
import { generateToken } from "../utils/jwt";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema";
import { createProfile } from "../models/profile.model";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validar datos usando Zod
        const { email, password, username } = RegisterSchema.parse(req.body);

        const userExists = await findUserByEmail(email);
        if (userExists) {
            res.status(400).json({ success: false, message: "Email already in use" });
            return;
        };

        const usernameExists = await findUserByUsername(username);
        if (usernameExists) {
            res.status(400).json({ success: false, message: "Username already in use" });
            return;
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(email, hashedPassword, username);

        await createProfile(user.id, "", "");

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                registeredAt: user.registered_at,
            },
        });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validar datos usando Zod
        const { email, password } = LoginSchema.parse(req.body);

        const user = await findUserByEmail(email);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ success: false, message: "Invalid credentials" });
            return;
        }

        const token = generateToken({ id: user.id, email: user.email });
        res.json({
            success: true,
            message: "Login successful",
            token,
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};
