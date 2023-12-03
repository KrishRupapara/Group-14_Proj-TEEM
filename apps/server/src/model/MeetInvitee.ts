import {
  pgTable,
  primaryKey,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

import { members } from "./Workspace";
import { meets } from "./Meet";

export const invitees = pgTable(
  "invitees",
  {
    meetID: integer("meetID")
      .references(() => meets.meetID, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    workspaceID: integer("workspaceID")
      .references(() => meets.workspaceID, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    inviteeID: integer("inviteeID")
      .references(() => members.memberID, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    isAccepted: boolean("isAccepted").notNull().default(false),
  },
  (table) => {
    return {
      pk: primaryKey(table.inviteeID, table.meetID, table.workspaceID),
    };
  }
);
