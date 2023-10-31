import { Request, Response } from "express";

import { db } from "../config/database";
import { eq } from "drizzle-orm";


import { users } from "../model/User";
import { workspaces } from "../model/Workspace";
import {calculateProjectProgress} from "../utils/calculateProgress";


export const dashboardGet = async (req: Request, res: Response) => {
  const User = await db
    .select()
    .from(users)
    .where(eq(users.userID, res.locals.userid))
    .limit(1);

  try {
    const wsList = [];
    const Workspace = await db
      .select({ wsID:workspaces.workspaceID, Title: workspaces.title, Description: workspaces.description })
      .from(workspaces)
      .where(eq(workspaces.projectManager, User[0].userID));

    console.log(Workspace);
    for (const workspace of Workspace){
      
      const { wsID, Title ,Description } = workspace;
      const Progress = calculateProjectProgress(workspace.wsID)
      const ws = {Title,Description,Progress};
      wsList.push(ws);
    }
    res.json(wsList);
    // res.send("<h1>Welcom to TEEM dashboard</h1>");

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in workspace" });
  }
  // res.send("<h1>Welcom to TEEM dashboard</h1>");
};

export const profileGet = async (req: Request, res: Response) => {
  
  try {
    const User = await db
    .select({Name : users.name, Email : users.emailId})
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