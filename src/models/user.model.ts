import { pool } from "../config/database";

export const findUserByEmail = async (email: string) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0];
};

export const findUserByUsername = async (username: string) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
};

export const createUser = async (email: string, password: string, username: string) => {
    const { rows } = await pool.query(
        `INSERT INTO users (email, password, username, registered_at) 
         VALUES ($1, $2, $3, NOW()) 
         RETURNING id, email, username, registered_at`,
        [email, password, username]
    );
    return rows[0];
};
