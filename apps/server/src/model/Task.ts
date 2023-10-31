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
      deadline : timestamp("deadline", { withTimezone: true, mode: 'string' }),
      type : varchar("type", { length: 40 }).default("Task"),
      status : varchar("status", { length: 40 }).default("0"),  /* 0:To Do; 1:In Progress, 2:Done  */
    //   status : integer("status").default(0),
      workspaceID: integer("workspaceID").references(() => workspaces.workspaceID),
      createdAt: timestamp("created_at").notNull().defaultNow(),
  });
  
