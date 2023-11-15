import { NextFunction, Request, Response } from "express";

import { db } from "../config/database";
// import { users } from "../model/User";
import { workspaces } from "../model/Workspace";
import { members } from "../model/Workspace";
import { and, eq } from "drizzle-orm";
import { getDecodedToken } from "../services/sessionServies";

export const wsExist = async(req: Request, res: Response, next: NextFunction) =>{
  const wsID:any = req.params.wsID;

  try {
    const Workspace = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.workspaceID, wsID))
      .limit(1);

      console.log(Workspace);

      if(Workspace.length !== 0)
      {
       res.locals.workspace = Workspace;
       console.log(res.locals.workspace);
        next()
      }
       else{
        res.status(404).send({Message: "Workspace Doesn't Exist"})
       }

  } catch (error) {
    
  }
}

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

  const wsID:any = req.params.wsID;
  const userID:any = req.user.userID;

  try {

    if (res.locals.workspace[0].projectManager === userID) next();

    else {
      res.send("You do not own the workspace");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal server error in middleware authManager" });
  }
};

export const authorizeMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const wsID:any = req.params.wsID;
  const userID:any = req.user.userID;

  try {

    
    if (res.locals.workspace[0].projectManager !== userID) {
      const isMemeber = await db
        .select()
        .from(members)
        .where(
          and(
            eq(members.workspaceID, wsID),
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
