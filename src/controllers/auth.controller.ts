import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createUser, findUserByEmail, findUserByUsername, updateUserStatusAndLoginInfo, resetLoginAttempts, incrementLoginAttempts } from "../models/user.model";
import { assignRoleToUser, getUserRole } from "../models/role.model";
import { generateToken } from "../utils/jwt";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema";
import { createProfile } from "../models/profile.model";
import { addToBlacklist } from "../middlewares/verifyToken";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
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

        await createProfile(user.id, "");
        await assignRoleToUser(user.id, 'user');

        // Generate token after registration
        const role = await getUserRole(user.id);
        const token = generateToken({ id: user.id, email: user.email, role });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                registeredAt: user.registered_at,
            },
        });
    } catch (error: any) {
        console.error('Registration error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = LoginSchema.parse(req.body);

        const user = await findUserByEmail(email);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            await incrementLoginAttempts(user.id);
            res.status(400).json({ success: false, message: "Invalid credentials" });
            return;
        }

        await resetLoginAttempts(user.id);
        const role = await getUserRole(user.id);
        if (!role) {
            res.status(500).json({ success: false, message: "Role not found for user" });
            return;
        }

        const token = generateToken({ id: user.id, email: user.email, role });
        
        await updateUserStatusAndLoginInfo(user.id, 'active', new Date(), 0);

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            res.status(400).json({ success: false, message: "Token missing" });
            return;
        }

        await addToBlacklist(token);
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
        console.error('Logout error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
