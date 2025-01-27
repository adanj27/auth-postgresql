import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { findProfileByUserId, updateProfile } from "../models/profile.model";

const router = Router();

router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = req.body.user;
        const profile = await findProfileByUserId(user.id);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json({
            message: "User profile",
            user: {
                email: user.email,
                name: user.name,
                username: profile.username,
                bio: profile.bio
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/profile", verifyToken, async (req, res) => {
    try {
        const user = req.body.user;
        const { username, bio } = req.body;

        const updatedProfile = await updateProfile(user.id, username, bio);

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json({
            message: "Profile updated successfully",
            user: {
                email: user.email,
                name: user.name,
                username: updatedProfile.username,
                bio: updatedProfile.bio
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
