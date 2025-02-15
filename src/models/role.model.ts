import { pool } from "../config/database";

// Asignar un rol a un usuario actualizando la tabla profiles
export const assignRoleToUser = async (userId: string, roleName: string): Promise<void> => {
  const roleResult = await pool.query('SELECT id FROM roles WHERE name = $1', [roleName]);
  if (roleResult.rows.length === 0) {
    throw new Error('Role not found');
  }
  const roleId = roleResult.rows[0].id;

  // Actualizar el perfil del usuario con el role_id
  await pool.query('UPDATE profiles SET role_id = $1 WHERE user_id = $2', [roleId, userId]);
};

// Obtener el rol de un usuario desde profiles
export const getUserRole = async (userId: string): Promise<string | null> => {
  const result = await pool.query(
    `SELECT r.name 
     FROM profiles p 
     JOIN roles r ON p.role_id = r.id 
     WHERE p.user_id = $1`,
    [userId]
  );
  return result.rows[0]?.name || null;
};
