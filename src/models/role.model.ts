import { pool } from "../config/database";

export const assignRoleToUser = async (userId: string, roleName: string): Promise<void> => {
  const roleResult = await pool.query('SELECT id FROM roles WHERE name = $1', [roleName]);
  if (roleResult.rows.length === 0) {
    throw new Error('Role not found');
  }
  const roleId = roleResult.rows[0].id;
  await pool.query('INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)', [userId, roleId]);
};

export const getUserRole = async (userId: string): Promise<string | null> => {
  const result = await pool.query(
    'SELECT r.name FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE ur.user_id = $1',
    [userId]
  );
  return result.rows[0]?.name || null;
};