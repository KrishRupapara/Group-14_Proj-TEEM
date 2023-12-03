"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkspaceDELETE = exports.editWSMembersPATCH = exports.editWSMembersGet = exports.editWsDetailsPATCH = exports.editWSDetailsGet = exports.getYourMeet = exports.getYourWork = exports.getPeople = exports.getAllPeople = exports.getStream = void 0;
const database_1 = require("../config/database");
const User_1 = require("../model/User");
const drizzle_orm_1 = require("drizzle-orm");
const Workspace_1 = require("../model/Workspace");
const TaskAssignee_1 = require("../model/TaskAssignee");
const Task_1 = require("../model/Task");
const MeetInvitee_1 = require("../model/MeetInvitee");
const Meet_1 = require("../model/Meet");
const redisConnect_1 = require("../config/redisConnect");
const getStream = async (req, res) => {
    const wsID = parseInt(req.params.wsID, 10);
    if (isNaN(wsID) || !Number.isInteger(wsID)) {
        return res.status(400).send({ message: "Invalid workspace ID" });
    }
    try {
        const taskStream = await database_1.db
            .select()
            .from(Task_1.tasks)
            .where((0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID));
        const meetStream = await database_1.db
            .select()
            .from(Meet_1.meets)
            .where((0, drizzle_orm_1.eq)(Meet_1.meets.workspaceID, wsID));
        const currentTimestamp = new Date();
        const Stream = [
            ...taskStream.map((task) => ({
                objectID: task.taskID,
                objectType: "task",
                objectTitle: task.title,
                objectDescription: task.description,
                objectStatus: task.status ? task.status : null,
                TaskDeadline: task.deadline ? new Date(task.deadline) : null,
                created_at: task.createdAt,
            })),
            ...meetStream.map((meet) => ({
                objectID: meet.meetID,
                objectType: "meet",
                objectTitle: meet.title,
                objectDescription: meet.agenda,
                objectStatus: meet.meetDate
                    ? new Date(meet.meetDate) > currentTimestamp ||
                        (new Date(meet.meetDate).getDate() === currentTimestamp.getDate() &&
                            new Date(meet.endTime) > currentTimestamp)
                        ? "UPCOMING"
                        : "DONE"
                    : null,
                created_at: meet.createdAt,
                meetDate: meet.meetDate,
            })),
        ];
        res.json({ Stream: Stream });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error in stream" });
    }
};
exports.getStream = getStream;
const getAllPeople = async (req, res) => {
    const wsID = parseInt(req.params.wsID, 10);
    try {
        const cachedData = await redisConnect_1.client.get(`ws:${wsID}:allpeople`, (err, reply) => {
            if (err) {
                console.log(err);
                return;
            }
            return reply;
        });
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }
        const people = await database_1.db
            .select({
            userID: User_1.users.userID,
            userName: User_1.users.name,
            emailID: User_1.users.emailId,
            role: Workspace_1.members.role,
        })
            .from(Workspace_1.members)
            .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(Workspace_1.members.memberID, User_1.users.userID))
            .where((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID));
        console.log(people);
        const current = people.filter((i) => i.userID === req.user.userID);
        await redisConnect_1.client.set(`ws:${wsID}:allpeople`, JSON.stringify({ People: people, current: current }), "EX", 60 * 60 * 24, "NX", (err, reply) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        return res.json({ People: people, current: current[0].userName });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error in people" });
    }
};
exports.getAllPeople = getAllPeople;
const getPeople = async (req, res) => {
    const wsID = parseInt(req.params.wsID, 10);
    try {
        const cachedData = await redisConnect_1.client.get(`ws:${wsID}:people`, (err, reply) => {
            if (err) {
                console.log(err);
                return;
            }
            return reply;
        });
        if (cachedData) {
            return res.json({ People: JSON.parse(cachedData) });
        }
        const Manager = await database_1.db
            .select({
            userID: User_1.users.userID,
            userName: User_1.users.name,
            emailID: User_1.users.emailId,
            role: Workspace_1.members.role,
        })
            .from(Workspace_1.members)
            .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(Workspace_1.members.memberID, User_1.users.userID))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID), (0, drizzle_orm_1.eq)(Workspace_1.members.role, "Manager")));
        const Teammate = await database_1.db
            .select({
            userID: Workspace_1.members.memberID,
            userName: User_1.users.name,
            emailID: User_1.users.emailId,
            role: Workspace_1.members.role,
        })
            .from(Workspace_1.members)
            .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(Workspace_1.members.memberID, User_1.users.userID))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID), (0, drizzle_orm_1.eq)(Workspace_1.members.role, "TeamMate")));
        const Client = await database_1.db
            .select({
            userID: Workspace_1.members.memberID,
            userName: User_1.users.name,
            emailID: User_1.users.emailId,
            role: Workspace_1.members.role,
        })
            .from(Workspace_1.members)
            .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(Workspace_1.members.memberID, User_1.users.userID))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID), (0, drizzle_orm_1.eq)(Workspace_1.members.role, "Client")));
        const Collaborator = await database_1.db
            .select({
            userID: Workspace_1.members.memberID,
            userName: User_1.users.name,
            emailID: User_1.users.emailId,
            role: Workspace_1.members.role,
        })
            .from(Workspace_1.members)
            .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(Workspace_1.members.memberID, User_1.users.userID))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID), (0, drizzle_orm_1.eq)(Workspace_1.members.role, "collaborator")));
        const People = {
            Manager: Manager,
            Teammate: Teammate,
            Collaborator: Collaborator,
            Client: Client,
        };
        await redisConnect_1.client.set(`ws:${wsID}:people`, JSON.stringify(People), "EX", 60 * 60 * 24, "NX", (err, reply) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        const val = await redisConnect_1.client.get(`ws:10:people`, (err, reply) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(reply);
            return reply;
        });
        console.log(val);
        return res.json({ People: People });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error in people" });
    }
};
exports.getPeople = getPeople;
const getYourWork = async (req, res) => {
    const wsID = req.workspace.workspaceID;
    const user_id = req.user.userID;
    const filterOption = req.query.filter || "All";
    try {
        if (filterOption === "Upcoming") {
            const currentTimestamp = new Date();
            if (user_id === req.workspace.projectManager) {
                const upcomingTask = await database_1.db
                    .select({
                    taskID: Task_1.tasks.taskID,
                    taskTitle: Task_1.tasks.title,
                    taskStatus: Task_1.tasks.status,
                    taskDeadline: Task_1.tasks.deadline,
                    taskType: Task_1.tasks.taskType,
                    taskDescription: Task_1.tasks.description,
                })
                    .from(Task_1.tasks)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.workspaceID, wsID), (0, drizzle_orm_1.gte)(Task_1.tasks.deadline, currentTimestamp)))
                    .orderBy(Task_1.tasks.deadline);
                res.json(upcomingTask);
            }
            else {
                const upcomingTask = await database_1.db
                    .select({
                    taskID: Task_1.tasks.taskID,
                    taskTitle: Task_1.tasks.title,
                    taskStatus: Task_1.tasks.status,
                    taskDeadline: Task_1.tasks.deadline,
                    taskType: Task_1.tasks.taskType,
                    taskDescription: Task_1.tasks.description,
                })
                    .from(Task_1.tasks)
                    .innerJoin(TaskAssignee_1.assignees, (0, drizzle_orm_1.eq)(Task_1.tasks.taskID, TaskAssignee_1.assignees.taskID))
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.workspaceID, wsID), (0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.assigneeID, user_id), (0, drizzle_orm_1.gte)(Task_1.tasks.deadline, currentTimestamp)))
                    .orderBy(Task_1.tasks.deadline);
                res.json(upcomingTask);
            }
        }
        else if (filterOption === "All") {
            if (user_id === req.workspace.projectManager) {
                let Work = await database_1.db
                    .select({
                    taskID: Task_1.tasks.taskID,
                    taskTitle: Task_1.tasks.title,
                    taskStatus: Task_1.tasks.status,
                    taskDeadline: Task_1.tasks.deadline,
                    taskType: Task_1.tasks.taskType,
                    taskDescription: Task_1.tasks.description,
                })
                    .from(Task_1.tasks)
                    .where((0, drizzle_orm_1.eq)(Task_1.tasks.workspaceID, wsID))
                    .orderBy((0, drizzle_orm_1.desc)(Task_1.tasks.createdAt));
                res.json(Work);
            }
            else {
                let Work = await database_1.db
                    .select({
                    taskID: Task_1.tasks.taskID,
                    taskTitle: Task_1.tasks.title,
                    taskStatus: Task_1.tasks.status,
                    taskDeadline: Task_1.tasks.deadline,
                    taskType: Task_1.tasks.taskType,
                    taskDescription: Task_1.tasks.description,
                })
                    .from(Task_1.tasks)
                    .innerJoin(TaskAssignee_1.assignees, (0, drizzle_orm_1.eq)(Task_1.tasks.taskID, TaskAssignee_1.assignees.taskID))
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.workspaceID, wsID), (0, drizzle_orm_1.eq)(TaskAssignee_1.assignees.assigneeID, user_id)))
                    .orderBy((0, drizzle_orm_1.desc)(Task_1.tasks.createdAt));
                res.json(Work);
            }
        }
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Internal server error in Your Work" });
    }
};
exports.getYourWork = getYourWork;
const getYourMeet = async (req, res) => {
    const wsID = req.workspace.workspaceID;
    const user_id = req.user.userID;
    const filterOption = req.query.filter || "All";
    try {
        if (filterOption === "Upcoming") {
            const currentTimestamp = new Date();
            const hours = currentTimestamp.getHours().toString().padStart(2, "0");
            const minutes = currentTimestamp.getMinutes().toString().padStart(2, "0");
            const seconds = currentTimestamp.getSeconds().toString().padStart(2, "0");
            const currentTime = `${hours}:${minutes}:${seconds}`;
            if (user_id === req.workspace.projectManager) {
                const upcomingMeet = await database_1.db
                    .select({
                    meetID: Meet_1.meets.meetID,
                    meetTitle: Meet_1.meets.title,
                    meetDate: Meet_1.meets.meetDate,
                    meetAgenda: Meet_1.meets.agenda,
                    meetOrganizer: User_1.users.name,
                })
                    .from(Meet_1.meets)
                    .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(Meet_1.meets.organizerID, User_1.users.userID))
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Meet_1.meets.workspaceID, wsID), (0, drizzle_orm_1.or)((0, drizzle_orm_1.sql) `${Meet_1.meets.meetDate} > ${currentTimestamp}`, (0, drizzle_orm_1.and)((0, drizzle_orm_1.sql) `${Meet_1.meets.meetDate} = ${currentTimestamp}`, (0, drizzle_orm_1.sql) `${Meet_1.meets.endTime} > ${currentTime}`))))
                    .orderBy(Meet_1.meets.meetDate);
                res.json(upcomingMeet);
            }
            else {
                const upcomingMeet = await database_1.db
                    .select({
                    meetID: Meet_1.meets.meetID,
                    meetTitle: Meet_1.meets.title,
                    meetDate: Meet_1.meets.meetDate,
                    meetAgenda: Meet_1.meets.agenda,
                    meetOrganizer: User_1.users.name,
                })
                    .from(Meet_1.meets)
                    .innerJoin(MeetInvitee_1.invitees, (0, drizzle_orm_1.eq)(Meet_1.meets.meetID, MeetInvitee_1.invitees.meetID))
                    .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(Meet_1.meets.organizerID, User_1.users.userID))
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.workspaceID, wsID), (0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.inviteeID, user_id), (0, drizzle_orm_1.or)((0, drizzle_orm_1.sql) `${Meet_1.meets.meetDate} > ${currentTimestamp}`, (0, drizzle_orm_1.and)((0, drizzle_orm_1.sql) `${Meet_1.meets.meetDate} = ${currentTimestamp}`, (0, drizzle_orm_1.sql) `${Meet_1.meets.endTime} > ${currentTime}`))))
                    .orderBy(Meet_1.meets.meetDate);
                res.json(upcomingMeet);
            }
        }
        else if (filterOption === "All") {
            if (user_id === req.workspace.projectManager) {
                const Meet = await database_1.db
                    .select({
                    meetID: Meet_1.meets.meetID,
                    meetTitle: Meet_1.meets.title,
                    meetTime: Meet_1.meets.meetDate,
                    meetAgenda: Meet_1.meets.agenda,
                    meetOrganizer: User_1.users.name,
                })
                    .from(Meet_1.meets)
                    .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(Meet_1.meets.organizerID, User_1.users.userID))
                    .where((0, drizzle_orm_1.eq)(Meet_1.meets.workspaceID, wsID))
                    .orderBy((0, drizzle_orm_1.desc)(Meet_1.meets.createdAt));
                res.json(Meet);
            }
            else {
                const Meet = await database_1.db
                    .select({
                    meetID: Meet_1.meets.meetID,
                    meetTitle: Meet_1.meets.title,
                    meetTime: Meet_1.meets.meetDate,
                    meetAgenda: Meet_1.meets.agenda,
                    meetOrganizer: User_1.users.name,
                })
                    .from(Meet_1.meets)
                    .innerJoin(MeetInvitee_1.invitees, (0, drizzle_orm_1.eq)(Meet_1.meets.meetID, MeetInvitee_1.invitees.meetID))
                    .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(Meet_1.meets.organizerID, User_1.users.userID))
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.workspaceID, wsID), (0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.inviteeID, user_id)))
                    .orderBy((0, drizzle_orm_1.desc)(Meet_1.meets.createdAt));
                res.json(Meet);
            }
        }
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Internal server error in Your Meet" });
    }
};
exports.getYourMeet = getYourMeet;
const editWSDetailsGet = async (req, res) => {
    const wsID = req.workspace.workspaceID;
    try {
        const Workspace = await database_1.db
            .select({
            title: Workspace_1.workspaces.title,
            description: Workspace_1.workspaces.description,
            type: Workspace_1.workspaces.type,
        })
            .from(Workspace_1.workspaces)
            .where((0, drizzle_orm_1.eq)(Workspace_1.workspaces.workspaceID, wsID))
            .limit(1);
        res.status(200).json(Workspace[0]);
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ message: "Internal server error in workspace" });
    }
};
exports.editWSDetailsGet = editWSDetailsGet;
const editWsDetailsPATCH = async (req, res) => {
    const wsID = req.workspace.workspaceID;
    const userID = req.user.userID;
    try {
        const { title, description, type } = req.body;
        if (title === undefined ||
            description === undefined ||
            type === undefined) {
            return res
                .status(400)
                .json({ error: "Title, description, and type are required" });
        }
        if (!title)
            return res.status(400).send({ error: "Title can not be empty" });
        if (!type)
            return res.status(400).send({ error: "Type can not be empty" });
        await database_1.db
            .update(Workspace_1.workspaces)
            .set({
            title: title,
            description: description,
            type: type,
        })
            .where((0, drizzle_orm_1.eq)(Workspace_1.workspaces.workspaceID, wsID));
        res.status(200).send({ message: "Settings Saved" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ message: "Internal server error in workspace" });
    }
};
exports.editWsDetailsPATCH = editWsDetailsPATCH;
const editWSMembersGet = async (req, res) => {
    const wsID = req.workspace.workspaceID;
    try {
        const Members = await database_1.db
            .select({
            Name: User_1.users.name,
            Role: Workspace_1.members.role,
        })
            .from(Workspace_1.members)
            .where((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID))
            .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(User_1.users.userID, Workspace_1.members.memberID));
        res.status(200).send({ Members: Members });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ message: "Internal server error in workspace" });
    }
};
exports.editWSMembersGet = editWSMembersGet;
const editWSMembersPATCH = async (req, res) => {
    const wsID = req.workspace.workspaceID;
    const userID = req.user.userID;
    const { Members = [] } = req.body;
    const unregisteredMembers = [];
    try {
        const Workspace = await database_1.db
            .select({
            title: Workspace_1.workspaces.title,
            description: Workspace_1.workspaces.description,
            type: Workspace_1.workspaces.type,
        })
            .from(Workspace_1.workspaces)
            .where((0, drizzle_orm_1.eq)(Workspace_1.workspaces.workspaceID, wsID))
            .limit(1);
        await database_1.db.delete(Workspace_1.members).where((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID));
        await database_1.db.insert(Workspace_1.members).values({
            workspaceID: wsID,
            memberID: userID,
            role: "Manager",
        });
        for (const Member of Members) {
            const { member_id, Role } = Member;
            const User = await database_1.db
                .select()
                .from(User_1.users)
                .where((0, drizzle_orm_1.eq)(User_1.users.emailId, member_id))
                .limit(1);
            if (User.length === 0) {
                unregisteredMembers.push(member_id);
            }
            else {
                console.log("Inserting");
                await database_1.db.insert(Workspace_1.members).values({
                    workspaceID: wsID,
                    memberID: User[0].userID,
                    role: Role,
                });
            }
        }
        if (unregisteredMembers.length > 0) {
            const projectManager = await database_1.db
                .select()
                .from(User_1.users)
                .where((0, drizzle_orm_1.eq)(User_1.users.userID, userID))
                .limit(1);
            res.status(201).send({
                message: " Settings Saved With Unregistered Members Invited",
                unregisteredMembers,
            });
        }
        else {
            res.status(200).send({ message: "Settings Saved" });
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ message: "Internal server error in workspace" });
    }
};
exports.editWSMembersPATCH = editWSMembersPATCH;
const deleteWorkspaceDELETE = async (req, res) => {
    try {
        const wsID = req.workspace.workspaceID;
        const currentWorkspace = await database_1.db
            .select()
            .from(Workspace_1.workspaces)
            .where((0, drizzle_orm_1.eq)(Workspace_1.workspaces.workspaceID, wsID))
            .limit(1);
        if (currentWorkspace.length < 1) {
            return res.status(400).send({ error: "No such Workspace found" });
        }
        if (req.user.userID !== currentWorkspace[0].projectManager) {
            res.send({ message: "You are not Project Manager" });
        }
        await database_1.db.delete(Workspace_1.workspaces).where((0, drizzle_orm_1.eq)(wsID, Workspace_1.workspaces.workspaceID));
        await database_1.db.delete(Workspace_1.members).where((0, drizzle_orm_1.eq)(wsID, Workspace_1.members.workspaceID));
        await database_1.db.delete(Task_1.tasks).where((0, drizzle_orm_1.eq)(wsID, Task_1.tasks.workspaceID));
        await database_1.db.delete(Meet_1.meets).where((0, drizzle_orm_1.eq)(wsID, Meet_1.meets.workspaceID));
        await database_1.db.delete(MeetInvitee_1.invitees).where((0, drizzle_orm_1.eq)(wsID, MeetInvitee_1.invitees.workspaceID));
        await database_1.db.delete(TaskAssignee_1.assignees).where((0, drizzle_orm_1.eq)(wsID, TaskAssignee_1.assignees.workspaceID));
        res.status(200).send({
            Message: "Workspace deleted successfully",
        });
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Internal server error in workspace" });
    }
};
exports.deleteWorkspaceDELETE = deleteWorkspaceDELETE;
function greaterThan(deadline, arg1) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=wsDashboardcontroller.js.map