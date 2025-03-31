/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Endpoints para gestión de usuarios por administradores
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Obtener lista de usuarios (Solo administradores)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filtro opcional para buscar usuarios por nombre de usuario o email
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Número de usuarios por página
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                         description: ID único del usuario
 *                       username:
 *                         type: string
 *                         example: johndoe
 *                         description: Nombre de usuario
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *                         description: Correo electrónico del usuario
 *                       role:
 *                         type: string
 *                         enum: [user, admin]
 *                         example: user
 *                         description: Rol del usuario
 *                       registered_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-01-01T12:00:00Z
 *                         description: Fecha de registro del usuario
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                       description: Total de usuarios
 *                     pages:
 *                       type: integer
 *                       example: 10
 *                       description: Total de páginas
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                       description: Página actual
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                       description: Usuarios por página
 *       401:
 *         description: No autorizado - Token inválido o expirado
 *       403:
 *         description: Prohibido - El usuario no tiene permisos de administrador
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */

/**
 * @swagger
 * /admin/users/{userId}:
 *   delete:
 *     summary: Eliminar un usuario por ID (Solo administradores)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado exitosamente
 *       401:
 *         description: No autorizado - Token inválido o expirado
 *       403:
 *         description: Prohibido - El usuario no tiene permisos de administrador
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */
