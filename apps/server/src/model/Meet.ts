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

import { members } from "./Member";
  
export const meets = pgTable("meets", {
    meetID : serial("meetID").primaryKey(),
    title: varchar("title", { length: 50 }).notNull(),
    agenda: varchar("agenda", { length: 200 }),
    description: varchar("description", { length: 200 }),
    meetTime : timestamp("meetTime", { precision: 6, withTimezone: true }),
    duration : time("duration", { precision: 6} ),
    workspaceID: integer("workspaceID"),
    organizerID: integer("organizerID"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  }, (table) => {
    return {
        meetReference: foreignKey({
            columns: [table.workspaceID, table.organizerID],
            foreignColumns: [members.workspaceID, members.memberID]
          })
    };
  });
  