import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 40 }).notNull(),
  password: text("password").notNull(),
  emailId: varchar("email_id", { length: 60 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  verificationToken: text("verification_token").notNull(),
});
