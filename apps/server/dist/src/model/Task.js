"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = exports.statusEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const Workspace_1 = require("./Workspace");
exports.statusEnum = (0, pg_core_1.pgEnum)("status", ["To Do", "In Progress", "Done"]);
exports.tasks = (0, pg_core_1.pgTable)("tasks", {
    taskID: (0, pg_core_1.serial)("taskID").notNull(),
    title: (0, pg_core_1.varchar)("title", { length: 50 }).notNull(),
    description: (0, pg_core_1.varchar)("description", { length: 200 }),
    taskType: (0, pg_core_1.varchar)("taskType", { length: 50 }),
    deadline: (0, pg_core_1.timestamp)("deadline"),
    status: (0, exports.statusEnum)("status").notNull().default("To Do"),
    workspaceID: (0, pg_core_1.integer)("workspaceID").references(() => Workspace_1.workspaces.workspaceID, {
        onUpdate: "cascade",
        onDelete: "cascade",
    }),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
}, (table) => {
    return {
        pk: (0, pg_core_1.primaryKey)(table.taskID),
    };
});
//# sourceMappingURL=Task.js.map