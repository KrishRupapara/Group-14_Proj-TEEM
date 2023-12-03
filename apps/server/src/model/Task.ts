import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

import { workspaces } from "./Workspace";

export const statusEnum = pgEnum("status", ["To Do", "In Progress", "Done"]);

export const tasks = pgTable(
  "tasks",
  {
    taskID: serial("taskID").notNull(),
    title: varchar("title", { length: 50 }).notNull(),
    description: varchar("description", { length: 200 }),
    taskType: varchar("taskType", { length: 50 }),
    deadline: timestamp("deadline"),
    status: statusEnum("status").notNull().default("To Do"),
    workspaceID: integer("workspaceID").references(
      () => workspaces.workspaceID,
      {
        onUpdate: "cascade",
        onDelete: "cascade",
      }
    ),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey(table.taskID),
    };
  }
);
