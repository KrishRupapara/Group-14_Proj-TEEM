"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileDELETE = exports.profilePATCH = exports.profileGet = exports.dashboardGet = void 0;
const database_1 = require("../config/database");
const drizzle_orm_1 = require("drizzle-orm");
const User_1 = require("../model/User");
const Workspace_1 = require("../model/Workspace");
const Meet_1 = require("../model/Meet");
const TaskAssignee_1 = require("../model/TaskAssignee");
const MeetInvitee_1 = require("../model/MeetInvitee");
const dashboardGet = async (req, res) => {
    try {
        console.log("dashboard");
        console.log(req.user.userID);
        const Workspace = await database_1.db
            .select({
            workspaceID: Workspace_1.workspaces.workspaceID,
            title: Workspace_1.workspaces.title,
            description: Workspace_1.workspaces.description,
            progress: Workspace_1.workspaces.progress,
            manager: User_1.users.name,
            type: Workspace_1.workspaces.type,
        })
            .from(Workspace_1.workspaces)
            .innerJoin(Workspace_1.members, (0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, Workspace_1.workspaces.workspaceID))
            .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(Workspace_1.workspaces.projectManager, User_1.users.userID))
            .where((0, drizzle_orm_1.eq)(Workspace_1.members.memberID, req.user.userID));
        console.log(Workspace);
        res.json(Workspace);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Internal server error in dashboard" });
    }
};
exports.dashboardGet = dashboardGet;
const profileGet = async (req, res) => {
    try {
        const User = await database_1.db
            .select({
            UserName: User_1.users.name,
            Email: User_1.users.emailId,
            Organization: User_1.users.organization,
            JobTitle: User_1.users.jobTitle,
            Country: User_1.users.country,
        })
            .from(User_1.users)
            .where((0, drizzle_orm_1.eq)(User_1.users.userID, req.user.userID))
            .limit(1);
        console.log(User[0]);
        res.json(User[0]);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Internal server error in Profile" });
    }
};
exports.profileGet = profileGet;
const profilePATCH = async (req, res) => {
    try {
        var { UserName, Email, Organization, JobTitle, Country } = req.body;
        if (UserName === undefined ||
            Email === undefined ||
            Organization === undefined ||
            JobTitle === undefined ||
            Country === undefined) {
            return res.status(400).json({ error: "insufficient request body" });
        }
        if (!UserName)
            return res.status(400).send({ error: "UserName can not be empty" });
        if (!Email)
            return res.status(400).send({ message: "Email ID cannot be empty" });
        const existingUserData = await database_1.db
            .select({
            UserName: User_1.users.name,
            Email: User_1.users.emailId,
            Organization: User_1.users.organization,
            JobTitle: User_1.users.jobTitle,
            Country: User_1.users.country,
        })
            .from(User_1.users)
            .where((0, drizzle_orm_1.eq)(User_1.users.userID, req.user.userID))
            .limit(1);
        const updatedUserData = req.body;
        const updatedFields = {};
        if (updatedUserData.Email !== existingUserData[0].Email) {
            return res.status(400).send({ message: "You cannot change email id" });
        }
        if (updatedUserData.UserName !== existingUserData[0].UserName)
            updatedFields.name = updatedUserData.UserName;
        if (updatedUserData.Organization !== existingUserData[0].Organization)
            updatedFields.organization = updatedUserData.Organization;
        if (updatedUserData.JobTitle !== existingUserData[0].JobTitle)
            updatedFields.jobTitle = updatedUserData.JobTitle;
        if (updatedUserData.Country !== existingUserData[0].Country)
            updatedFields.country = updatedUserData.Country;
        if (Object.keys(updatedFields).length > 0) {
            const updatedUser = await database_1.db
                .update(User_1.users)
                .set(updatedFields)
                .where((0, drizzle_orm_1.eq)(User_1.users.userID, req.user.userID));
            return res.status(200).send({ message: "Profile updated successfully" });
        }
        else {
            return res.status(200).send({ message: "Nothing to updated" });
        }
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Internal server error in Profile" });
    }
};
exports.profilePATCH = profilePATCH;
const profileDELETE = async (req, res) => {
    try {
        const userID = req.user.userID;
        const userToDel = await database_1.db
            .select()
            .from(User_1.users)
            .where((0, drizzle_orm_1.eq)(User_1.users.userID, userID))
            .limit(1);
        if (userToDel.length < 1) {
            return res.status(400).send({ error: "Invalid Credentials" });
        }
        await database_1.db.delete(User_1.users).where((0, drizzle_orm_1.eq)(userID, User_1.users.userID));
        await database_1.db.delete(Workspace_1.workspaces).where((0, drizzle_orm_1.eq)(userID, Workspace_1.workspaces.projectManager));
        const workspacesOfUser = await database_1.db
            .select()
            .from(Workspace_1.workspaces)
            .where((0, drizzle_orm_1.eq)(Workspace_1.workspaces.projectManager, userID));
        for (let i = 0; i < workspacesOfUser.length; i++) {
            await database_1.db
                .delete(Workspace_1.workspaces)
                .where((0, drizzle_orm_1.eq)(Workspace_1.workspaces.workspaceID, workspacesOfUser[i].workspaceID));
        }
        await database_1.db.delete(Meet_1.meets).where((0, drizzle_orm_1.eq)(userID, Meet_1.meets.organizerID));
        await database_1.db.delete(TaskAssignee_1.assignees).where((0, drizzle_orm_1.eq)(userID, TaskAssignee_1.assignees.assigneeID));
        await database_1.db.delete(MeetInvitee_1.invitees).where((0, drizzle_orm_1.eq)(userID, MeetInvitee_1.invitees.inviteeID));
        await database_1.db.delete(Workspace_1.members).where((0, drizzle_orm_1.eq)(userID, Workspace_1.members.memberID));
        res.status(200).json({ message: "User deleted successfully" });
        res.json({
            message: `User with email : ${userToDel[0].emailId} deleted successfully`,
            NOTE: "User is not deleted from redisclient and sessions table",
            "CHECK FOR": "User and it's workspace, meetings, tasks, invites, assignees, members are deleted from database",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.profileDELETE = profileDELETE;
//# sourceMappingURL=dashboardController.js.map