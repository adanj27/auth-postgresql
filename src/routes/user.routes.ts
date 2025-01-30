import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { getProfile, updateUserProfile } from '../controllers/profile.controller';

const router = Router();

// Obtener el perfil del usuario
router.get("/profile", verifyToken, getProfile);

// Actualizar el perfil del usuario
router.put("/profile", verifyToken, updateUserProfile);

export default router;