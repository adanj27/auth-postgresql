/**
 * @swagger
 * tags:
 *   name: Superadmin
 *   description: Superadmin management endpoints
 */

/**
 * @swagger
 * /superadmin/users:
 *   get:
 *     summary: Obtener la lista de usuarios (solo superadmin)
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - SuperAdmin
 *     responses:
 *       200:
 *         description: Lista de usuarios recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *                       registered_at:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /superadmin/change-role:
 *   post:
 *     summary: Cambiar el rol de un usuario (solo superadmin)
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - SuperAdmin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               newRole:
 *                 type: string
 *                 enum: [user, admin, superadmin]
 *     responses:
 *       200:
 *         description: Rol de usuario cambiado exitosamente
 *       400:
 *         description: Rol inválido o no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
