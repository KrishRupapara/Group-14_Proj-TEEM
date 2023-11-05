import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

import { users } from "./User";

export const workspaces = pgTable("workspaces", {
  workspaceID: serial("workspaceID").primaryKey(),
  title: varchar("title", { length: 50 }).notNull(),
  type: varchar("type").notNull(),
  progress: integer("progress").notNull().default(0),
  description: varchar("description", { length: 200 }),
  projectManager: integer("projectManager")
    .references(() => users.userID, {
      onUpdate: "cascade",
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const members = pgTable(
  "members",
  {
    workspaceID: integer("workspaceID")
      .references(() => workspaces.workspaceID, {
        onUpdate: "cascade",
        onDelete: "cascade",
      })
      .notNull(),
    memberID: integer("memberID")
      .references(() => users.userID, {
        onUpdate: "cascade",
        onDelete: "cascade",
      })
      .notNull(),
    role: integer("role").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey(table.memberID),
    };
  }
);
