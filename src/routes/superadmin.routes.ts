import express from 'express';
import { verifyToken, authorize } from '../middlewares/verifyToken';
import { getUsers, changeUserRole } from '../controllers/superadmin.controller';

const superadminRoutes = express.Router();

// Proteger todas las rutas con autenticación y autorización
superadminRoutes.use(verifyToken);
superadminRoutes.use(authorize('superadmin'));

// Obtener lista de usuarios (con filtro opcional por nombre)
superadminRoutes.get('/users', getUsers);

// Cambiar el rol de un usuario
superadminRoutes.post('/change-role', changeUserRole);

export default superadminRoutes;