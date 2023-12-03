"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.members = exports.workspaces = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const User_1 = require("./User");
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["Manager", "TeamMate", "collaborator", "Client"]);
exports.workspaces = (0, pg_core_1.pgTable)("workspaces", {
    workspaceID: (0, pg_core_1.serial)("workspaceID").primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 50 }).notNull(),
    type: (0, pg_core_1.varchar)("type").notNull(),
    progress: (0, pg_core_1.integer)("progress").notNull().default(0),
    description: (0, pg_core_1.varchar)("description", { length: 200 }),
    projectManager: (0, pg_core_1.integer)("projectManager")
        .references(() => User_1.users.userID, {
        onUpdate: "cascade",
        onDelete: "cascade",
    })
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt").notNull().defaultNow(),
});
exports.members = (0, pg_core_1.pgTable)("members", {
    workspaceID: (0, pg_core_1.integer)("workspaceID")
        .references(() => exports.workspaces.workspaceID, {
        onUpdate: "cascade",
        onDelete: "cascade",
    })
        .notNull(),
    memberID: (0, pg_core_1.integer)("memberID")
        .references(() => User_1.users.userID, {
        onUpdate: "cascade",
        onDelete: "cascade",
    })
        .notNull(),
    role: (0, exports.roleEnum)("role").notNull(),
}, (table) => {
    return {
        pk: (0, pg_core_1.primaryKey)(table.memberID, table.workspaceID),
    };
});
//# sourceMappingURL=Workspace.js.map