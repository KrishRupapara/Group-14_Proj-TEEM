import { NextFunction, Request, Response } from "express";

import { db } from "../config/database";
// import { users } from "../model/User";
import { workspaces, members } from "../model/Workspace";
import { and, eq } from "drizzle-orm";
import { getDecodedToken } from "../services/sessionServies";

export const wsExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const wsID:any = parseInt(req.params.wsID, 10);

  if (wsID != req.params.wsID) {
    return res.status(400).send({Error: "Invalid wsID"});
  }

  try {
    const Workspace = await db
      .select({
        workspaceID: workspaces.workspaceID,
        title: workspaces.title,
        projectManager: workspaces.projectManager,
      })
      .from(workspaces)
      .where(eq(workspaces.workspaceID, wsID))
      .limit(1);

    // console.log(Workspace[0]);

    if (Workspace.length > 0) {
      req.workspace = Workspace[0];
      console.log(req.workspace);
      next();
    } else {
      res.status(404).send({ Message: "Workspace Doesn't Exist" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Internal server error in wsExist middleware" });
  }
};

export const authorizeManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const ws_token = req.cookies.wsToken;
  // const decodedWsToken = await getDecodedToken(ws_token);
  // const wsID = decodedWsToken.workspace_id;

  // const workspaceID: { wsID: any } = {
  //   wsID: wsID,
  // };

  const userID: any = req.user.userID;

  try {
    if (req.workspace.projectManager === userID) next();
    else {
      res.status(401).send({error: "You do not own the workspace"});
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal server error in middleware authManager" });
  }
};

// authoeizeMember allowed manager
export const authorizeMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userID = req.user.userID;
  const wsID = req.workspace.workspaceID;
  // const wsID = parseInt(req.params.workspaceID, 10);

  try {
    if (req.workspace.projectManager !== userID) {
      const isMemeber = await db
        .select()
        .from(members)
        .where(and(eq(members.workspaceID, wsID), eq(members.memberID, userID)))
        .limit(1);

      if (isMemeber.length === 0) {
        res.status(401).send({
          Message: "You are not a part of the workspace",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal server error in middleware authMember" });
  }
};
