import dotenv from "dotenv";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
neonConfig.fetchConnectionCache = true;
dotenv.config();

if (!process.env.DATABASE_URI) {
  throw new Error("database uri not found!!");
}

const sql = neon(process.env.DATABASE_URI);

export const db = drizzle(sql);
