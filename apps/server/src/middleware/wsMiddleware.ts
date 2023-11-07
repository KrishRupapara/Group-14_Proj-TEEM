import { NextFunction, Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { workspaces } from "../model/Workspace";
import { members } from "../model/Workspace";
import { and, eq } from "drizzle-orm";
import { getDecodedToken } from "../services/sessionServies";

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

  const workspaceID: { wsID: any } = {
    wsID: req.params.wsID,
  };
  const userID = res.locals.userid;

  try {
    const isManager = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.workspaceID, workspaceID.wsID))
      .limit(1);

    console.log(isManager[0]);
    console.log(workspaceID.wsID);
    console.log(userID);
    console.log(isManager);

    if (isManager[0].projectManager === userID as number) next();
    else {
      res.send("You do not own the workspace");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal server error in workspace" });
  }
};

export const authorizeMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const workspaceID: { wsID: any } = {
    wsID: req.params.wsID,
  };

  const userID = res.locals.userid;

  try {
    const isManager = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.workspaceID, workspaceID.wsID))
      .limit(1);

    console.log(isManager[0]);
    console.log(userID);

    if (isManager.length == 0) res.send("Workspace doesn't exist");

    if (isManager[0].projectManager !== userID) {
      const isMemeber = await db
        .select()
        .from(members)
        .where(
          and(
            eq(members.workspaceID, workspaceID.wsID),
            eq(members.memberID, userID)
          )
        )
        .limit(1);

      if (isMemeber.length === 0) {
        res.send("You are not a part of the workspace");
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
