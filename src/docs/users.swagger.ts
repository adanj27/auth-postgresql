/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get list of users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Optional search parameter to filter users by name
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Internal server error
 */
