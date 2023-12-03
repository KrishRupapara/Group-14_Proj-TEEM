"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.removeTaskAssignees = exports.addTaskAssignees = exports.editTaskDetails = exports.getTask = exports.editTaskAssigneesPATCH = exports.editTaskAssigneesGet = exports.showAssignees = exports.editTaskDetailsPATCH = exports.editTaskDetailsGet = exports.assignTaskPost = exports.assignTaskGet = void 0;
const database_1 = require("../config/database");
const User_1 = require("../model/User");
const drizzle_orm_1 = require("drizzle-orm");
const Task_1 = require("../model/Task");
const Workspace_1 = require("../model/Workspace");
const TaskAssignee_1 = require("../model/TaskAssignee");
const progress_1 = require("../utils/progress");
const assignTaskGet = async (req, res) => {
    res.send("<h1>You can create new Task</h1>");
};
exports.assignTaskGet = assignTaskGet;
const assignTaskPost = async (req, res) => {
    var { title, description, status, taskType, deadline, Assignees = [], } = req.body;
    const wsID = req.workspace.workspaceID;
    if (!(title && deadline)) {
        return res.status(400).send({ error: "Enter Mandatory Fields" });
    }
    const nonmemberAssignee = [];
    const assignee = [];
    const unregisteredAssignee = [];
    try {
        const task_id = await database_1.db
            .insert(Task_1.tasks)
            .values({
            title: title,
            description: description,
            taskType: taskType,
            deadline: new Date(deadline),
            status: status,
            workspaceID: wsID,
        })
            .returning({ task_id: Task_1.tasks.taskID });
        console.log(task_id[0].task_id);
        for (const assignee_id of Assignees) {
            const User = await database_1.db
                .select()
                .from(User_1.users)
                .where((0, drizzle_orm_1.eq)(User_1.users.emailId, assignee_id))
                .limit(1);
            if (User.length > 0) {
                const member = await database_1.db
                    .select()
                    .from(Workspace_1.members)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID), (0, drizzle_orm_1.eq)(Workspace_1.members.memberID, User[0].userID)))
                    .limit(1);
                if (member.length === 0) {
                    nonmemberAssignee.push(assignee_id);
                }
                else {
                    assignee.push(assignee_id);
                    await database_1.db.insert(TaskAssignee_1.assignees).values({
                        taskID: task_id[0].task_id,
                        workspaceID: wsID,
                        assigneeID: member[0].memberID,
                    });
                }
            }
            else {
                unregisteredAssignee.push(assignee_id);
            }
        }
        if (nonmemberAssignee.length > 0 || unregisteredAssignee.length > 0) {
            res.status(201).send({
                message: "Task assigned only to workspace member",
                memberAssignee: assignee,
                NonmemberAssignee: nonmemberAssignee,
                unregisteredAssignee: unregisteredAssignee,
            });
        }
        else {
            res.status(201).send({ message: "Task created successfully", assignee });
        }
        const updatedProgress = await (0, progress_1.updateProjectProgress)(wsID);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error in task" });
    }
};
exports.assignTaskPost = assignTaskPost;
const editTaskDetailsGet = async (req, res) => {
    try {
        const wsID = req.workspace.workspaceID;
        const taskID = req.task.taskID;
        if (taskID && wsID) {
            const Task = await database_1.db
                .select()
                .from(Task_1.tasks)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Task_1.tasks.taskID, taskID), (0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID)))
                .limit(1);
            return res.status(200).json(Task[0]);
        }
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Internal server error in task exist Middleware" });
    }
};
exports.editTaskDetailsGet = editTaskDetailsGet;
const editTaskDetailsPATCH = async (req, res) => {
    const wsID = req.workspace.workspaceID;
    const taskID = req.task.taskID;
    var { title, description, deadline, taskType: type, status } = req.body;
    try {
        if (title === undefined ||
            description === undefined ||
            type === undefined ||
            status === undefined) {
            return res.status(400).json({ error: "Fields are insufficient" });
        }
        else if (title === null || title === "")
            return res.status(400).send({ error: "Title can not be empty" });
        else {
            const existingTask = await database_1.db
                .select()
                .from(Task_1.tasks)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Task_1.tasks.taskID, taskID), (0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID)))
                .limit(1);
            const updatedFields = {};
            if (title !== existingTask[0].title)
                updatedFields.title = title;
            if (description !== existingTask[0].description)
                updatedFields.description = description;
            if (deadline !== existingTask[0].deadline)
                updatedFields.deadline = new Date(deadline);
            if (type !== existingTask[0].taskType)
                updatedFields.taskType = type;
            if (status !== existingTask[0].status)
                updatedFields.status = status;
            if (Object.keys(updatedFields).length > 0) {
                const updatedTask = await database_1.db
                    .update(Task_1.tasks)
                    .set(updatedFields)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Task_1.tasks.taskID, taskID), (0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID)));
                const updatedProgress = await (0, progress_1.updateProjectProgress)(wsID);
                return res.status(200).send({ message: "Task Edited Successfully" });
            }
            return res.status(200).send({ message: "Nothing to update" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error in task" });
    }
};
exports.editTaskDetailsPATCH = editTaskDetailsPATCH;
const showAssignees = async (req, res) => {
    const wsID = req.params.wsID;
    const taskID = req.params.taskID;
    console.log("Showing");
    try {
        res.status(200).send({ Assignees: res.locals.assignees });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error in task" });
    }
};
exports.showAssignees = showAssignees;
const editTaskAssigneesGet = async (req, res) => {
    (0, exports.showAssignees)(req, res);
};
exports.editTaskAssigneesGet = editTaskAssigneesGet;
const editTaskAssigneesPATCH = async (req, res) => {
    const wsID = req.workspace.workspaceID;
    const taskID = req.params.taskID;
    const nonmemberAssignee = [];
    const assignee = [];
    const unregisteredAssignee = [];
    var { Assignees = [] } = req.body;
    try {
        if (Assignees.length === 0)
            res.status(400).send({ Error: "Can't Add Empty Assignees" });
        else {
            for (const Assignee of Assignees) {
                const { assignee_id } = Assignee;
                if (assignee_id !== undefined) {
                    console.log("Defined");
                    const User = await database_1.db
                        .select()
                        .from(User_1.users)
                        .where((0, drizzle_orm_1.eq)(User_1.users.emailId, assignee_id))
                        .limit(1);
                    if (assignee_id !== undefined) {
                        console.log("Defined");
                        const User = await database_1.db
                            .select()
                            .from(User_1.users)
                            .where((0, drizzle_orm_1.eq)(User_1.users.emailId, assignee_id))
                            .limit(1);
                        if (User.length > 0) {
                            const member = await database_1.db
                                .select()
                                .from(Workspace_1.members)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID), (0, drizzle_orm_1.eq)(Workspace_1.members.memberID, User[0].userID)))
                                .limit(1);
                            if (User.length > 0) {
                                const member = await database_1.db
                                    .select()
                                    .from(Workspace_1.members)
                                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID), (0, drizzle_orm_1.eq)(Workspace_1.members.memberID, User[0].userID)))
                                    .limit(1);
                                console.log(member[0]);
                                if (member.length === 0) {
                                    nonmemberAssignee.push(assignee_id);
                                }
                                else {
                                    assignee.push(assignee_id);
                                }
                            }
                            else {
                                unregisteredAssignee.push(assignee_id);
                            }
                        }
                    }
                    if (assignee.length === 0) {
                        res.status(400).send({
                            Error: "No changes made as no assignee is part of the workspace",
                        });
                    }
                    else {
                        await database_1.db
                            .delete(TaskAssignee_1.assignees)
                            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.workspaceID, wsID), (0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.taskID, taskID)));
                        for (var i = 0; i < assignee.length; ++i) {
                            const User = await database_1.db
                                .select()
                                .from(User_1.users)
                                .where((0, drizzle_orm_1.eq)(User_1.users.emailId, assignee[i]))
                                .limit(1);
                            for (var i = 0; i < assignee.length; ++i) {
                                const User = await database_1.db
                                    .select()
                                    .from(User_1.users)
                                    .where((0, drizzle_orm_1.eq)(User_1.users.emailId, assignee[i]))
                                    .limit(1);
                                await database_1.db.insert(TaskAssignee_1.assignees).values({
                                    taskID: taskID,
                                    workspaceID: wsID,
                                    assigneeID: User[0].userID,
                                });
                            }
                            await database_1.db.insert(TaskAssignee_1.assignees).values({
                                taskID: taskID,
                                workspaceID: wsID,
                                assigneeID: User[0].userID,
                            });
                        }
                        if (nonmemberAssignee.length > 0 ||
                            unregisteredAssignee.length > 0) {
                            res.status(201).send({
                                message: "Task assigned only to workspace member",
                                memberAssignee: assignee,
                                NonmemberAssignee: nonmemberAssignee,
                                unregisteredAssignee: unregisteredAssignee,
                            });
                        }
                        else {
                            res
                                .status(201)
                                .send({ message: "Assigned Members Added", assignee });
                        }
                    }
                    if (nonmemberAssignee.length > 0 || unregisteredAssignee.length > 0) {
                        res.status(201).send({
                            message: "Task assigned only to workspace member",
                            memberAssignee: assignee,
                            NonmemberAssignee: nonmemberAssignee,
                            unregisteredAssignee: unregisteredAssignee,
                        });
                    }
                    else {
                        res
                            .status(201)
                            .send({ message: "Assigned Members Added", assignee });
                    }
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error in task" });
    }
};
exports.editTaskAssigneesPATCH = editTaskAssigneesPATCH;
const getTask = async (req, res, next) => {
    res.status(200).send({
        Title: res.locals.taskTitle,
        Description: res.locals.taskDescription,
        Deadline: res.locals.taskDeadline,
        Status: res.locals.taskStatus,
    });
};
exports.getTask = getTask;
const editTaskDetails = async (req, res) => {
    const wsID = req.params.wsID;
    const taskID = req.params.taskID;
    var { title, description, deadline, Assignees = [] } = req.body;
    try {
        if (title !== res.locals.taskTitle) {
            await database_1.db
                .update(Task_1.tasks)
                .set({ title: title })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID), (0, drizzle_orm_1.eq)(Task_1.tasks.taskID, taskID)));
        }
        if (description !== res.locals.taskDescription) {
            await database_1.db
                .update(Task_1.tasks)
                .set({ description: description })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID), (0, drizzle_orm_1.eq)(Task_1.tasks.taskID, taskID)));
        }
        if (deadline !== res.locals.taskDeadline) {
            await database_1.db
                .update(Task_1.tasks)
                .set({ deadline: deadline })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID), (0, drizzle_orm_1.eq)(Task_1.tasks.taskID, taskID)));
        }
        res.status(200).send("Task Details Edited Successfully");
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error in task" });
    }
};
exports.editTaskDetails = editTaskDetails;
const addTaskAssignees = async (req, res) => {
    const wsID = req.params.wsID;
    const taskID = req.params.taskID;
    var { Assignees = [] } = req.body;
    console.log(Assignees.length);
    if (Assignees.length === 0)
        res.send({ message: "Please add assignees" });
    try {
        const nonmemberAssignee = [];
        const assignee = [];
        const unregisteredAssignee = [];
        for (const Assignee of Assignees) {
            const { assignee_id } = Assignee;
            if (assignee_id !== undefined) {
                console.log("Defined");
                const User = await database_1.db
                    .select()
                    .from(User_1.users)
                    .where((0, drizzle_orm_1.eq)(User_1.users.emailId, assignee_id))
                    .limit(1);
                if (User.length > 0) {
                    const member = await database_1.db
                        .select()
                        .from(Workspace_1.members)
                        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID), (0, drizzle_orm_1.eq)(Workspace_1.members.memberID, User[0].userID)))
                        .limit(1);
                    console.log(member[0]);
                    if (member.length === 0) {
                        nonmemberAssignee.push(assignee_id);
                    }
                    else {
                        assignee.push(assignee_id);
                        await database_1.db.insert(TaskAssignee_1.assignees).values({
                            taskID: taskID,
                            workspaceID: wsID,
                            assigneeID: member[0].memberID,
                        });
                    }
                }
                else {
                    unregisteredAssignee.push(assignee_id);
                }
                if (nonmemberAssignee.length > 0 || unregisteredAssignee.length > 0) {
                    res.status(201).send({
                        message: "Task assigned only to workspace member",
                        memberAssignee: assignee,
                        NonmemberAssignee: nonmemberAssignee,
                        unregisteredAssignee: unregisteredAssignee,
                    });
                }
                else {
                    res.send({ message: "Assigned Members Added", assignee });
                }
            }
            else {
                res.send("Can't Add Empty Assignee");
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error in task" });
    }
};
exports.addTaskAssignees = addTaskAssignees;
const removeTaskAssignees = async (req, res) => {
    const wsID = req.params.wsID;
    const taskID = req.params.taskID;
    var { Assignees = [] } = req.body;
    const unregisteredAssignee = [];
    if (Assignees.length === 0)
        res.send({ message: "Please add assignees" });
    try {
        for (const Assignee of Assignees) {
            const { assignee_id } = Assignee;
            const User = await database_1.db
                .select()
                .from(User_1.users)
                .where((0, drizzle_orm_1.eq)(User_1.users.emailId, assignee_id));
            if (User.length !== 0) {
                await database_1.db
                    .delete(TaskAssignee_1.assignees)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.workspaceID, wsID), (0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.taskID, taskID), (0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.assigneeID, User[0].userID)));
            }
            else {
                unregisteredAssignee.push(assignee_id);
            }
        }
        res.send({ message: "Assignees Deleted Succesfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error in task" });
    }
};
exports.removeTaskAssignees = removeTaskAssignees;
const deleteTask = async (req, res) => {
    try {
        const taskIDToDelete = req.params.taskID;
        const wsID = req.params.wsID;
        await database_1.db.delete(Task_1.tasks).where((0, drizzle_orm_1.eq)(Task_1.tasks.taskID, taskIDToDelete));
        await database_1.db.delete(TaskAssignee_1.assignees).where((0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.taskID, taskIDToDelete));
        res.status(200).send({
            message: "Task deleted successfully",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error in task" });
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map