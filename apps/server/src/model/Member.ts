import {
    pgTable,
    primaryKey,
    serial,
    varchar,
    timestamp,
    text,
    boolean,
    integer,
  } from "drizzle-orm/pg-core";
import { users } from "./User";
import { workspaces } from "./Workspace";

  
export const members = pgTable("members", {
    workspaceID: integer("workspaceID").references(() => workspaces.workspaceID),
    memberID: integer("memberID").references(() => users.userID),
    role: integer("role").notNull(),
    // createdAt: timestamp("created_at").notNull().defaultNow(),
  }, (table) => {
    return {
      pk: primaryKey(table.workspaceID, table.memberID),
    };
  });
  