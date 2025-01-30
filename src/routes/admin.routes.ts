import express from 'express';
import { verifyToken, authorize } from '../middlewares/verifyToken';
import { getUsers, deleteUser } from '../controllers/admin.controller';

const adminRoutes = express.Router();

// Proteger todas las rutas con autenticación y autorización
adminRoutes.use(verifyToken);
adminRoutes.use(authorize('admin'));

// Obtener lista de usuarios
adminRoutes.get('/users', getUsers);

// Eliminar un usuario
adminRoutes.delete('/users/:userId', deleteUser);

export default adminRoutes;