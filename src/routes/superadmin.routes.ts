import express from 'express';
import { verifyToken, authorize } from '../middlewares/verifyToken';
import { changeUserRole } from '../controllers/superadmin.controller';
import { getUsers } from '../controllers/users.controller';

const superadminRoutes = express.Router();

// Proteger todas las rutas con autenticación y autorización
superadminRoutes.use(verifyToken);

// Obtener lista de usuarios (con filtro opcional por nombre)
superadminRoutes.get('/users', authorize('superadmin'), getUsers);

// Cambiar el rol de un usuario
superadminRoutes.post('/change-role', authorize('superadmin'), changeUserRole);

export default superadminRoutes;