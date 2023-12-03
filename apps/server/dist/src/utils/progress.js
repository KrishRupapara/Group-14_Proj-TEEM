"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectProgress = void 0;
const Task_1 = require("../model/Task");
const database_1 = require("../config/database");
const drizzle_orm_1 = require("drizzle-orm");
const Workspace_1 = require("../model/Workspace");
const updateProjectProgress = async (wsID) => {
    try {
        const tTask = await database_1.db
            .select()
            .from(Task_1.tasks)
            .where((0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID));
        const totalTasks = tTask.length;
        let Progress = 0;
        let roundedProgress = 0;
        if (totalTasks > 0) {
            const cTask = await database_1.db
                .select()
                .from(Task_1.tasks)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID), (0, drizzle_orm_1.eq)(Task_1.tasks.status, "Done")));
            const completedTasks = cTask.length;
            Progress = (completedTasks / totalTasks) * 100;
            roundedProgress = Math.floor(Progress);
        }
        const updatedProgress = await database_1.db
            .update(Workspace_1.workspaces)
            .set({ progress: roundedProgress })
            .where((0, drizzle_orm_1.eq)(Workspace_1.workspaces.workspaceID, wsID))
            .returning({ updatedProgress: Workspace_1.workspaces.progress });
        return updatedProgress[0].updatedProgress;
    }
    catch (err) {
        console.log(err);
    }
};
exports.updateProjectProgress = updateProjectProgress;
//# sourceMappingURL=progress.js.map