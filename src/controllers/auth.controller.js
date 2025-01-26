"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await (0, user_model_1.findUserByEmail)(email);
    if (userExists) {
        res.status(400).json({ message: "Email already in use" });
        return; // Asegúrate de que no devuelves el resultado explícito.
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await (0, user_model_1.createUser)(email, hashedPassword);
    res.status(201).json({ message: "User registered successfully", user });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await (0, user_model_1.findUserByEmail)(email);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
    }
    const token = (0, jwt_1.generateToken)({ id: user.id, email: user.email });
    res.json({ message: "Login successful", token });
};
exports.login = login;
