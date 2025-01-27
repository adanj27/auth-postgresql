import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../utils/validate";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/register", validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);

export default router;
