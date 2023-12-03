import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  driver: "pg",
  schema: ["./src/model/*.ts"],
  dbCredentials: {
    connectionString: process.env.DATABASE_URI!,
  },
  out: "./src/model",
} satisfies Config;
