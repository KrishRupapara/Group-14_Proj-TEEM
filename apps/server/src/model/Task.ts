import {
    pgTable,
    primaryKey,
    foreignKey,
    AnyPgColumn,
    serial,
    varchar,
    time,
    timestamp,
    text,
    boolean,
    integer,
  } from "drizzle-orm/pg-core";

import { workspaces } from "./Workspace";
  
export const tasks = pgTable("tasks", {
    taskID : serial("taskID").primaryKey(),
    title: varchar("title", { length: 50 }).notNull(),
    description: varchar("description", { length: 200 }),
    deadline : timestamp("deadline", { precision: 6, withTimezone: true }),
    status : varchar("status", { length: 40 }).notNull(),
    workspaceID: integer("workspaceID").references(() => workspaces.workspaceID),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  });
  