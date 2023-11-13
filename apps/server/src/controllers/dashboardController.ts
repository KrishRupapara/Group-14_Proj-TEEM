import { Request, Response } from "express";

import { db } from "../config/database";
import { eq } from "drizzle-orm";

import { users } from "../model/User";
import { members, workspaces } from "../model/Workspace";
// import {updateProjectProgress} from "../utils/progress";

export const dashboardGet = async (req: Request, res: Response) => {
  try {
    // const User = await db
    //   .select()
    //   .from(users)
    //   .where(eq(users.userID, req.user.userID))
    //   .limit(1);

    // console.log(User[0].userID);

    const Workspace = await db
      .select({
        title: workspaces.title,
        description: workspaces.description,
        progress: workspaces.progress,
        manager : users.name,
        type : workspaces.type,
      })
      .from(workspaces)
      .innerJoin(members, eq(members.workspaceID, workspaces.workspaceID))
      .innerJoin(users, eq(workspaces.projectManager,users.userID))
      .where(eq(members.memberID, req.user.userID));

    // console.log(Workspace);

    res.json(Workspace);
    // res.send("<h1>Welcom to TEEM dashboard</h1>");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in dashboard" });
  }
  // res.send("<h1>Welcom to TEEM dashboard</h1>");
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

    console.log(User);

    res.json(User);
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

    // console.log(existingUserData);

    const updatedUserData = req.body;

    const updatedFields: { [key: string]: any } = {};

    // Check if the user has updated their organization
    if (updatedUserData.Email !== existingUserData[0].Email) {
      return res.send({ message: "You cannot change email id" });
    }
    if (updatedUserData.UserName !== existingUserData[0].UserName) {
      updatedFields.name = updatedUserData.UserName;
    }
    if (updatedUserData.Organization !== existingUserData[0].Organization) {
      updatedFields.organization = updatedUserData.Organization;
    }
    if (updatedUserData.JobTitle !== existingUserData[0].JobTitle) {
      updatedFields.JobTitle = updatedUserData.JobTitle;
    }
    if (updatedUserData.Country !== existingUserData[0].Country) {
      updatedFields.Country = updatedUserData.Country;
    }

    // console.log(updatedFields);
    if (Object.keys(updatedFields).length > 0) {
      const updatedUser = await db
        .update(users)
        .set(updatedFields)
        .where(eq(users.userID, req.user.userID));

      // console.log(updatedUser);

      return res.send({ message: "Profile updated successfully" });
    } else {
      return res.send({ message: "Nothing to updated" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in Profile" });
  }
};

export const profileDELETE = async (req: Request, res: Response) => {
  
};