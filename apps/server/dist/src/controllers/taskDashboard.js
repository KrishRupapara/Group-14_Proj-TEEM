"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskDashboard = void 0;
const database_1 = require("../config/database");
const User_1 = require("../model/User");
const drizzle_orm_1 = require("drizzle-orm");
const Task_1 = require("../model/Task");
const Workspace_1 = require("../model/Workspace");
const TaskAssignee_1 = require("../model/TaskAssignee");
const redisConnect_1 = require("../config/redisConnect");
const taskDashboard = async (req, res) => {
    try {
        const wsID = req.workspace.workspaceID;
        const task_ID = req.task.taskID;
        const cachedTask = await redisConnect_1.client.get(`task:${task_ID}`, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "Internal server error" });
            }
            return data;
        });
        if (cachedTask) {
            return res.status(200).json(JSON.parse(cachedTask));
        }
        const Task = await database_1.db
            .select()
            .from(Task_1.tasks)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Task_1.tasks.taskID, task_ID), (0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID)))
            .limit(1);
        console.log(Task);
        const Assignees = await database_1.db
            .select({
            assigneeID: TaskAssignee_1.assignees.assigneeID,
            assigneeName: User_1.users.name,
            assigneeRole: Workspace_1.members.role,
            assigneeEmailID: User_1.users.emailId,
        })
            .from(TaskAssignee_1.assignees)
            .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.assigneeID, User_1.users.userID))
            .innerJoin(Workspace_1.members, (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.assigneeID, Workspace_1.members.memberID), (0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.workspaceID, Workspace_1.members.workspaceID)))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.taskID, task_ID), (0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.workspaceID, wsID)));
        console.log(Assignees);
        const taskDashboard = {
            task: Task[0],
            Assignees: Assignees,
        };
        await redisConnect_1.client.set(`task:${task_ID}`, JSON.stringify(taskDashboard), "EX", 60 * 60 * 24);
        if (cachedTask) {
            return res.status(200).json(JSON.parse(cachedTask));
        }
        res.status(200).json(taskDashboard);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Internal server error in task dashboard" });
    }
};
exports.taskDashboard = taskDashboard;
//# sourceMappingURL=taskDashboard.js.map