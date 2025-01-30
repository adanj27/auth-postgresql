import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller";
import { validate } from "../utils/validate";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/signup", validate(RegisterSchema), register);
router.post("/signin", validate(LoginSchema), login);
router.post('/logout', logout);

export default router;
