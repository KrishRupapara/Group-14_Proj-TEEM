"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meets = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const Workspace_1 = require("./Workspace");
exports.meets = (0, pg_core_1.pgTable)("meets", {
    meetID: (0, pg_core_1.serial)("meetID"),
    title: (0, pg_core_1.varchar)("title", { length: 50 }).notNull(),
    agenda: (0, pg_core_1.varchar)("agenda", { length: 200 }),
    description: (0, pg_core_1.varchar)("description", { length: 200 }),
    meetDate: (0, pg_core_1.date)("meetDate").notNull(),
    startTime: (0, pg_core_1.time)("startTime").notNull(),
    endTime: (0, pg_core_1.time)("endTime").notNull(),
    venue: (0, pg_core_1.varchar)("venue", { length: 200 }),
    workspaceID: (0, pg_core_1.integer)("workspaceID").notNull(),
    organizerID: (0, pg_core_1.integer)("organizerID").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
}, (table) => {
    return {
        fk: (0, pg_core_1.foreignKey)({
            columns: [table.workspaceID, table.organizerID],
            foreignColumns: [Workspace_1.members.workspaceID, Workspace_1.members.memberID],
        })
            .onDelete("cascade")
            .onUpdate("cascade"),
        pk: (0, pg_core_1.primaryKey)(table.meetID, table.workspaceID, table.organizerID),
    };
});
//# sourceMappingURL=Meet.js.map