   // auth-postgresql/src/models/profile.model.ts
   import { pool } from "../config/database";

   export const findProfileByUserId = async (userId: number) => {
       const { rows } = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [userId]);
       return rows[0];
   };

   export const createProfile = async (userId: number, name: string) => {
       const { rows } = await pool.query(
           `INSERT INTO profiles (user_id, name) 
            VALUES ($1, $2) 
            RETURNING id, user_id, name`,
           [userId, name]
       );
       return rows[0];
   };

   export const updateProfile = async (userId: number, name: string) => {
       const { rows } = await pool.query(
           `UPDATE profiles 
            SET name = $1 
            WHERE user_id = $2
            RETURNING id, user_id, name`,
           [name, userId]
       );
       return rows[0];
};
   