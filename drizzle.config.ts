import { defineConfig } from "drizzle-kit";

const DATABASE_URL = "postgresql://postgres:Password%40123@localhost:5432/test";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts", // ✅ correct based on your structure
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
