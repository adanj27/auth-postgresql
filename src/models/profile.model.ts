   // auth-postgresql/src/models/profile.model.ts
   import { pool } from "../config/database";

   export const findProfileByUserId = async (userId: number) => {
       const { rows } = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [userId]);
       return rows[0];
   };

   export const createProfile = async (userId: number, username: string, bio: string) => {
       const { rows } = await pool.query(
           `INSERT INTO profiles (user_id, username, bio) 
            VALUES ($1, $2, $3) 
            RETURNING id, user_id, username, bio`,
           [userId, username, bio]
       );
       return rows[0];
   };

   export const updateProfile = async (userId: number, username: string, bio: string) => {
       const { rows } = await pool.query(
           `UPDATE profiles 
            SET username = $1, bio = $2 
            WHERE user_id = $3 
            RETURNING id, user_id, username, bio`,
           [username, bio, userId]
       );
       return rows[0];
};
   