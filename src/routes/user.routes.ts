import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/profile", verifyToken, (req, res) => {
    res.json({ message: "User profile", user: req.body.user });
});

export default router;
