/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile user management endpoints
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Obtener el perfil del usuario autenticado
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Profile
 *     responses:
 *       200:
 *         description: Perfil del usuario recuperado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     username:
 *                       type: string
 *                     bio:
 *                       type: string
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Actualizar el perfil del usuario autenticado
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *       404:
 *         description: Perfil no encontrado
 *       500:
 *         description: Error interno del servidor
 */
