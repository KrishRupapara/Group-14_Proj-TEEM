import { Request, Response } from "express";

import { db } from "../config/database";
import { eq } from "drizzle-orm";

import { users } from "../model/User";
import { members, workspaces } from "../model/Workspace";
// import {updateProjectProgress} from "../utils/progress";

export const dashboardGet = async (req: Request, res: Response) => {
  try {
    const User = await db
      .select()
      .from(users)
      .where(eq(users.userID, res.locals.userid))
      .limit(1);

    console.log(User[0].userID);

    const Workspace = await db
      .select({
        Title: workspaces.title,
        Description: workspaces.description,
        Progress: workspaces.progress,
      })
      .from(workspaces)
      .innerJoin(members,eq(members.workspaceID,workspaces.workspaceID))
      .where(eq(members.memberID, res.locals.userid));

    console.log(Workspace);

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
      .select({ Name: users.name, Email: users.emailId })
      .from(users)
      .where(eq(users.userID, res.locals.userid))
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
