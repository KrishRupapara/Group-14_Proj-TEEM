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
    memberID: varchar("memberID", { length: 60 }).references(() => users.emailId), // emailID is not primary key in users table
    role: integer("role"),
    // createdAt: timestamp("created_at").notNull().defaultNow(),
  }, (table) => {
    return {
      pk: primaryKey(table.workspaceID, table.memberID),
    };
  });
  