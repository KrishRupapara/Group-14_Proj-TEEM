"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignees = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const Task_1 = require("./Task");
const Workspace_1 = require("./Workspace");
exports.assignees = (0, pg_core_1.pgTable)("assignees", {
    taskID: (0, pg_core_1.integer)("taskID"),
    workspaceID: (0, pg_core_1.integer)("workspaceID"),
    assigneeID: (0, pg_core_1.integer)("assigneeID"),
}, (table) => {
    return {
        pk: (0, pg_core_1.primaryKey)(table.taskID, table.workspaceID, table.assigneeID),
        meetReference: (0, pg_core_1.foreignKey)({
            columns: [table.taskID],
            foreignColumns: [Task_1.tasks.taskID],
        }),
        inviteeReference: (0, pg_core_1.foreignKey)({
            columns: [table.workspaceID, table.assigneeID],
            foreignColumns: [Workspace_1.workspaces.workspaceID, Workspace_1.members.memberID],
        }),
    };
});
//# sourceMappingURL=TaskAssignee.js.map