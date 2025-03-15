// auth-postgresql/src/models/profile.model.ts
import { pool } from '../config/database';

export const findProfileByUserId = async (userId: string) => {
  try {
    console.log('Fetching profile for user ID:', userId);
    const result = await pool.query(
      `SELECT p.*, u.email, u.username 
       FROM profiles p 
       JOIN users u ON p.user_id = u.id 
       WHERE p.user_id = $1`,
      [userId]
    );
    console.log('Query result:', result.rows);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching profile by user ID:', error);
    throw error;
  }
};

export const createProfile = async (userId: string, name: string, bio: string = '', roleId: string | null = null) => {
    try {
      const { rows } = await pool.query(
        `INSERT INTO profiles (user_id, name, bio, role_id) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, user_id, name, bio, role_id`,
        [userId, name, bio, roleId]
      );
      return rows[0];
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error; // Relanza el error para manejarlo en el controlador
    }
  };

  export const updateProfile = async (userId: string, name: string, bio: string | null = null, roleId: string | null = null) => {
    try {
      const { rows } = await pool.query(
        `UPDATE profiles 
         SET name = $1, bio = $2, role_id = $3
         WHERE user_id = $4
         RETURNING id, user_id, name, bio, role_id`,
        [name, bio, roleId, userId]
      );
      return rows[0];
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error; // Relanza el error para manejarlo en el controlador
    }
  };
