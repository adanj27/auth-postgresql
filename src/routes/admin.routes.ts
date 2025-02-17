import express from 'express';
import { verifyToken, authorize } from '../middlewares/verifyToken';
import { deleteUser } from '../controllers/admin.controller';
import { getUsers } from '../controllers/users.controller';

const adminRoutes = express.Router();

// Proteger todas las rutas con autenticación y autorización
adminRoutes.use(verifyToken);

// Obtener lista de usuarios
adminRoutes.get('/users', authorize('admin'), getUsers);

// Eliminar un usuario
adminRoutes.delete('/users/:userId', authorize('admin'), deleteUser);

export default adminRoutes;