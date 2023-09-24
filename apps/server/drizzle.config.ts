import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default {
  driver: "pg",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URI!,
  },
} satisfies Config;
