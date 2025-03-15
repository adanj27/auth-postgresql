import { Router } from 'express';
import { authorize, verifyToken } from '../middlewares/verifyToken';
import { getProfile, updateUserProfile } from '../controllers/profile.controller';

const router = Router();

// Protect all user routes with authentication
router.use(verifyToken);

// Obtener el perfil del usuario
router.get("/profile", authorize('user'), getProfile);

// Actualizar el perfil del usuario
router.put("/profile", authorize('user'), updateUserProfile);

export default router;