"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserByEmail = void 0;
const database_1 = require("../config/database");
const findUserByEmail = async (email) => {
    const { rows } = await database_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0];
};
exports.findUserByEmail = findUserByEmail;
const createUser = async (email, password) => {
    const { rows } = await database_1.pool.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email", [email, password]);
    return rows[0];
};
exports.createUser = createUser;
