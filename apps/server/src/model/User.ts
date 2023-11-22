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
  emailId: varchar("emailId", { length: 60 }).notNull().unique(),
  password: text("password"),
  organization: varchar("organization", { length: 200 }),
  jobTitle: varchar("jobTitle", { length: 200 }),
  country: varchar("country", { length: 200 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  isVerified: boolean("isVerified").notNull().default(false),
  isConnectedToGoogle: boolean("isConnectedToGoogle").notNull().default(false),
  gmailID: varchar("gmailID", {length: 60}),
});
