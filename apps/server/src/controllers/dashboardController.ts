import { Request, Response } from "express";

import { db } from "../config/database";
import { eq } from "drizzle-orm";

import { users } from "../model/User";
import { members, workspaces } from "../model/Workspace";
import { meets } from "../model/Meet";
import { tasks } from "../model/Task";
import { assignees } from "../model/TaskAssignee";
import { invitees } from "../model/MeetInvitee";

// import {updateProjectProgress} from "../utils/progress";

export const dashboardGet = async (req: Request, res: Response) => {
  try {
    // const User = await db
    //   .select()
    //   .from(users)
    //   .where(eq(users.userID, req.user.userID))
    //   .limit(1);

    // console.log(User[0].userID);
    console.log("dashboard");
    console.log(req.user.userID);

    const Workspace = await db
      .select({
        workspaceID: workspaces.workspaceID,
        title: workspaces.title,
        description: workspaces.description,
        progress: workspaces.progress,
        manager: users.name,
        type: workspaces.type,
      })
      .from(workspaces)
      .innerJoin(members, eq(members.workspaceID, workspaces.workspaceID))
      .innerJoin(users, eq(workspaces.projectManager, users.userID))
      .where(eq(members.memberID, req.user.userID));

    console.log(Workspace);

    res.json(Workspace);
    // res.send("<h1>Welcom to TEEM dashboard</h1>");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in dashboard" });
  }
  // res.send("<h1>Welcome to TEEM dashboard</h1>");
};

export const profileGet = async (req: Request, res: Response) => {
  try {
    const User = await db
      .select({
        UserName: users.name,
        Email: users.emailId,
        Organization: users.organization,
        JobTitle: users.jobTitle,
        Country: users.country,
      })
      .from(users)
      .where(eq(users.userID, req.user.userID))
      .limit(1);

    console.log(User[0]);

    res.json(User[0]);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in Profile" });
  }
};

export const profilePATCH = async (req: Request, res: Response) => {
  try {
    var { UserName, Email, Organization, JobTitle, Country } = req.body;

    if (
      UserName === undefined ||
      Email === undefined ||
      Organization === undefined ||
      JobTitle === undefined ||
      Country === undefined
    ) {
      return res.status(400).json({ error: "insufficient request body" });
    }
    if (!UserName)
      return res.status(400).send({ error: "UserName can not be empty" });
    if (!Email)
      return res.status(400).send({ message: "Email ID cannot be empty" });

    const existingUserData = await db
      .select({
        UserName: users.name,
        Email: users.emailId,
        Organization: users.organization,
        JobTitle: users.jobTitle,
        Country: users.country,
      })
      .from(users)
      .where(eq(users.userID, req.user.userID))
      .limit(1);

    const updatedUserData = req.body;

    const updatedFields: { [key: string]: string } = {};

    // Check if the user has updated their organization

    if (updatedUserData.Email !== existingUserData[0].Email)
      return res.send({ message: "You cannot change email id" });

    if (updatedUserData.UserName !== existingUserData[0].UserName)
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
      const updatedUser = await db
        .update(users)
        .set(updatedFields)
        .where(eq(users.userID, req.user.userID));

      // console.log(updatedUser);

      return res.status(200).send({ message: "Profile updated successfully" });
    } else {
      return res.status(200).send({ message: "Nothing to updated" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in Profile" });
  }
};

export const profileDELETE = async (req: Request, res: Response) => {
  try {
    const userID: any = req.user.userID; // get userID from req.user

    // find user from database
    const userToDel = await db
      .select()
      .from(users)
      .where(eq(users.userID, userID))
      .limit(1);

    if (userToDel.length < 1) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }

    // delete user from users table
    await db.delete(users).where(eq(userID, users.userID));

    // delete user from workspace table
    await db.delete(workspaces).where(eq(userID, workspaces.projectManager));

    // find workspaces of user
    const workspacesOfUser = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.projectManager, userID));

    // delete all the workspaces of user
    for (let i = 0; i < workspacesOfUser.length; i++) {
      await db
        .delete(workspaces)
        .where(eq(workspaces.workspaceID, workspacesOfUser[i].workspaceID));
    }

    //delete user from meetings table
    await db.delete(meets).where(eq(userID, meets.organizerID));

    //delete user from assignees table
    await db.delete(assignees).where(eq(userID, assignees.assigneeID));

    //delete user from invites table
    await db.delete(invitees).where(eq(userID, invitees.inviteeID));

    //delete user from members table
    await db.delete(members).where(eq(userID, members.memberID));

    // // delete user from redisclient
    // redisClient.del(userToDel[0].emailId);

    res.status(200).json({ message: "User deleted successfully" });

    // //delete user from sessions table
    // deleteSession(userID);

    res.json({
      message: `User with email : ${userToDel[0].emailId} deleted successfully`,
      NOTE: "User is not deleted from redisclient and sessions table",
      "CHECK FOR":
        "User and it's workspace, meetings, tasks, invites, assignees, members are deleted from database",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};
