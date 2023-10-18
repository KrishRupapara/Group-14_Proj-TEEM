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
import { meets } from "./Meet";
  
export const invitees = pgTable("invitees", {
    meetID : serial("meetID"),
    workspaceID: integer("workspaceID"),
    inviteeID: integer("inviteeID"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  }, (table) => {
    return {
        pk: primaryKey(table.meetID, table.workspaceID, table.inviteeID),

        meetReference: foreignKey({
            columns: [table.meetID],
            foreignColumns: [meets.meetID]
        }),

        inviteeReference: foreignKey({
            columns: [table.workspaceID, table.inviteeID],
            foreignColumns: [members.workspaceID, members.memberID]
        })
    };
  });
  