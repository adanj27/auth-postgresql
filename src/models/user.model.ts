import { pool } from "../config/database";

export const findUserByEmail = async (email: string) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0];
};

export const createUser = async (email: string, password: string, name: string) => {
    const { rows } = await pool.query(
        `INSERT INTO users (email, password, name, registered_at) 
         VALUES ($1, $2, $3, NOW()) 
         RETURNING id, email, name, registered_at`,
        [email, password, name]
    );
    return rows[0];
};
