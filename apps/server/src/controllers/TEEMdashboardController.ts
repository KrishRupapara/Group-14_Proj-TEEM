import { Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { eq } from "drizzle-orm";
import { sendInvitation } from "../services/sendInvitation";

import { workspaces } from "../model/Workspace";
import { members } from "../model/Member";

export const TEEMdashboardGet = async (req: Request, res: Response) => {
  const User = await db
    .select()
    .from(users)
    .where(eq(users.userID, res.locals.userid))
    .limit(1);

  try {
    const Workspace = await db
      .select({ Title: workspaces.title, Description: workspaces.description })
      .from(workspaces)
      .where(eq(workspaces.projectManager, User[0].userID));

    console.log(Workspace);

    res.json(Workspace);
    // res.send("<h1>Welcom to TEEM dashboard</h1>");

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in workspace" });
  }
  // res.send("<h1>Welcom to TEEM dashboard</h1>");
};
