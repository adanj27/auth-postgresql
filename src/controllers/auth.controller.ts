import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../models/user.model";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const userExists = await findUserByEmail(email);
    if (userExists) {
        res.status(400).json({ message: "Email already in use" });
        return; // Asegúrate de que no devuelves el resultado explícito.
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword);

    res.status(201).json({ message: "User registered successfully", user });
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ message: "Login successful", token });
};
