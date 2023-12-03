"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskDetails = exports.authorizeAssignee = exports.taskExist = void 0;
const database_1 = require("../config/database");
const User_1 = require("../model/User");
const Task_1 = require("../model/Task");
const TaskAssignee_1 = require("../model/TaskAssignee");
const drizzle_orm_1 = require("drizzle-orm");
const taskExist = async (req, res, next) => {
    try {
        const taskID = parseInt(req.params.taskID, 10);
        if (taskID != req.params.taskID) {
            return res.status(400).send({ Error: "Invalid taskID" });
        }
        const wsID = req.workspace.workspaceID;
        const Task = await database_1.db
            .select({
            taskID: Task_1.tasks.taskID,
            title: Task_1.tasks.title,
            workspaceID: Task_1.tasks.workspaceID,
        })
            .from(Task_1.tasks)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Task_1.tasks.taskID, taskID), (0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID)))
            .limit(1);
        if (Task.length > 0) {
            req.task = Task[0];
            console.log(req.task);
            next();
        }
        else {
            res.status(404).send({ Message: "Task Doesn't Exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Internal server error in task exist Middleware" });
    }
};
exports.taskExist = taskExist;
const authorizeAssignee = async (req, res, next) => {
    try {
        const userID = req.user.userID;
        const wsID = req.workspace.workspaceID;
        const taskID = req.task.taskID;
        if (req.workspace.projectManager !== userID) {
            const isAssignee = await database_1.db
                .select()
                .from(TaskAssignee_1.assignees)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.workspaceID, wsID), (0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.assigneeID, userID)))
                .limit(1);
            if (isAssignee.length === 0) {
                res.status(401).send({ error: "You have not been assigned to this task" });
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal server error in authorize assignee middleware",
        });
    }
};
exports.authorizeAssignee = authorizeAssignee;
const getTaskDetails = async (req, res, next) => {
    const wsID = req.params.wsID;
    const taskID = req.params.taskID;
    try {
        const Task = await database_1.db
            .select()
            .from(Task_1.tasks)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID), (0, drizzle_orm_1.eq)(Task_1.tasks.taskID, taskID)))
            .limit(1);
        console.log(Task);
        if (Task.length == 0)
            return res.status(404).send({ error: "Task doesn't exist" });
        res.locals.taskTitle = Task[0].title;
        res.locals.taskDescription = Task[0].description;
        res.locals.taskDeadline = Task[0].deadline;
        res.locals.taskStatus = Task[0].status;
        console.log("Saved");
        const Assignees = await database_1.db
            .select({
            name: User_1.users.name,
        })
            .from(TaskAssignee_1.assignees)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.workspaceID, wsID), (0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.taskID, taskID)))
            .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(User_1.users.userID, TaskAssignee_1.assignees.assigneeID));
        res.locals.assignees = Assignees;
        next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ message: "Internal server error in task Middleware" });
    }
};
exports.getTaskDetails = getTaskDetails;
//# sourceMappingURL=taskMiddleware.js.map