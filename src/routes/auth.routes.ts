import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../utils/validate";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/signup", validate(RegisterSchema), register);
router.post("/signin", validate(LoginSchema), login);

export default router;
