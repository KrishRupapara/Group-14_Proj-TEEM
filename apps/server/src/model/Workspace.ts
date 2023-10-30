import {
    pgTable,
    AnyPgColumn,
    ForeignKeyBuilder,
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
    projectManager: integer("projectManager").references(() => users.userID, { onUpdate: "cascade", onDelete: "cascade" } ).notNull(), // emailID is not primary key in users table
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  });
  