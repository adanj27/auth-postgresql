import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Necesario si Render requiere SSL
    },
});
