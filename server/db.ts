import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from "../shared/schema.js"; // ✅ relative import from /server

const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ??
    "postgresql://postgres:Password%40123@localhost:5432/test",
});

export const db = drizzle(pool, { schema });
export { pool };
