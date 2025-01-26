import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://aj270594:6sJxZoDTMzDUgE1hiyMznRjKPWpKycXP@dpg-cub7o05ds78s73aafa50-a.oregon-postgres.render.com/authdb_msm8",
  ssl: {
    rejectUnauthorized: false, // Necesario si Render requiere SSL
  },
});
