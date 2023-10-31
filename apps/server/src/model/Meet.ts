import {
  pgTable,
  serial,
  varchar,
  time,
  timestamp,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

import { workspaces, members } from "./Workspace";

export const meets = pgTable(
  "meets",
  {
    meetID: serial("meetID"),
    title: varchar("title", { length: 50 }).notNull(),
    agenda: varchar("agenda", { length: 200 }),
    description: varchar("description", { length: 200 }),
    meetTime: timestamp("meetTime", { precision: 6, withTimezone: true }),
    duration: time("duration"),
    workspaceID: integer("workspaceID")
      .references(() => workspaces.workspaceID, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    organizerID: integer("organizerID").references(() => members.memberID, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey(table.meetID, table.workspaceID, table.organizerID),
    };
  }
);
