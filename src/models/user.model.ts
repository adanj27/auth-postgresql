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

export const updateUserStatusAndLoginInfo = async (userId: number, status: string, lastLogin: Date, loginAttempts: number) => {
    const { rows } = await pool.query(
        `UPDATE users SET status = $1, last_login = $2, login_attempts = $3 WHERE id = $4 RETURNING *`,
        [status, lastLogin, loginAttempts, userId]
    );
    return rows[0];
};

export const resetLoginAttempts = async (userId: number) => {
    const { rows } = await pool.query(
        `UPDATE users SET login_attempts = 0 WHERE id = $1 RETURNING *`,
        [userId]
    );
    return rows[0];
};

export const incrementLoginAttempts = async (userId: number) => {
    const { rows } = await pool.query(
        `UPDATE users SET login_attempts = login_attempts + 1 WHERE id = $1 RETURNING *`,
        [userId]
    );
    return rows[0];
};
