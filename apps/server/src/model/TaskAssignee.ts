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
import { tasks } from "./Task";
export const assignees = pgTable("assignees", {
    taskID : integer("taskID"),
    workspaceID: integer("workspaceID"),
    assigneeID: integer("assigneeID"),
    // createdAt: timestamp("created_at").notNull().defaultNow(),
  }, (table) => {
    return {
        pk: primaryKey(table.taskID, table.workspaceID, table.assigneeID),

        meetReference: foreignKey({
            columns: [table.taskID],
            foreignColumns: [tasks.taskID]
        }),

        inviteeReference: foreignKey({
            columns: [table.workspaceID, table.assigneeID],
            foreignColumns: [members.workspaceID, members.memberID]
        })
    };
  });
  