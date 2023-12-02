import {
  pgTable,
  serial,
  varchar,
  time,
  date,
  timestamp,
  integer,
  primaryKey,
  foreignKey,
} from "drizzle-orm/pg-core";

import { workspaces, members } from "./Workspace";

export const meets = pgTable(
  "meets",
  {
    meetID: serial("meetID"),
    title: varchar("title", { length: 50 }).notNull(),
    agenda: varchar("agenda", { length: 200 }),
    description: varchar("description", { length: 200 }),
    meetDate: date("meetDate").notNull(),
    startTime: time("startTime").notNull(),
    endTime: time("endTime").notNull(),
    venue: varchar("venue", { length: 200 }),
    workspaceID: integer("workspaceID").notNull(),
    organizerID: integer("organizerID").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      fk: foreignKey({
        columns: [table.workspaceID, table.organizerID],
        foreignColumns: [members.workspaceID, members.memberID],
      })
        .onDelete("cascade")
        .onUpdate("cascade"),

      pk: primaryKey(table.meetID, table.workspaceID, table.organizerID),
    };
  }
);
