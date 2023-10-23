import {
    pgTable,
    serial,
    varchar,
    timestamp,
    text,
    boolean,
    integer,
  } from "drizzle-orm/pg-core";
import { users } from "./User";
  
export const workspaces = pgTable("workspaces", {
    workspaceID: serial("workspaceID").primaryKey(),
    title: varchar("title", { length: 50 }).notNull(),
    description: varchar("description", { length: 200 }),
    // projectManager: varchar("email_id", { length: 60 }).notNull().references(() => users.emailId), // emailID is not primary key in users table
    projectManager: integer("user_id").notNull().references(() => users.userID), // emailID is not primary key in users table
    createdAt: timestamp("created_at").notNull().defaultNow(),
  });
  