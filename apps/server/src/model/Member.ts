import {
    pgTable,
    primaryKey,
    foreignKey,
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
    workspaceID: integer("workspaceID").references(() => workspaces.workspaceID, { onUpdate: "cascade", onDelete: "cascade" } ),
    memberID: integer("memberID").references(() => users.userID, { onUpdate: "cascade", onDelete: "cascade" } ),
    role: integer("role").notNull(),
    // createdAt: timestamp("created_at").notNull().defaultNow(),
  }, (table) => {
    return {
      pk: primaryKey(table.workspaceID, table.memberID),

    //   memberReference: foreignKey({
    //     columns: [table.workspaceID, table.memberID],
    //     foreignColumns: [workspaces.workspaceID, users.userID], 
    // }).onDelete("cascade"),
    };
  });
  