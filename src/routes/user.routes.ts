import { Router } from 'express';
import { authorize, verifyToken } from '../middlewares/verifyToken';
import { getProfile, updateUserProfile } from '../controllers/profile.controller';

const router = Router();

// router.use(verifyToken);

// Obtener el perfil del usuario
router.get("/profile", getProfile);

// Actualizar el perfil del usuario
router.put("/profile", authorize('user'), updateUserProfile);

export default router;