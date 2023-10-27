import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userID: serial("userID").primaryKey(),
  name: varchar("name", { length: 40 }).notNull(),
  password: text("password"),
  emailId: varchar("emailId", { length: 60 }).notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  isVerified: boolean("isVerified").notNull().default(false),
});
