import { NextFunction, Request, Response } from "express";
import { db } from "../config/database";
import { users } from "../model/User";
import { and, eq } from "drizzle-orm";
import { getDecodedToken } from "../services/sessionServies";
import { sendTask } from "../services/sendTask";
import { signJWT } from "../utils/jwt";

import { meets } from "../model/Meet";
import { invitees } from "../model/MeetInvitee";

import { workspaces, members } from "../model/Workspace";

import { assignees } from "../model/TaskAssignee";
import { updateProjectProgress } from "../utils/progress";

export const meetDashboard = async (req: Request, res: Response) => {
  try {
    const userID = req.user.userID;
    const wsID = req.workspace.workspaceID;
    const meetID = req.meet.meetID;

    const Meet = await db
      .select()
      .from(meets)
      .where(and(eq(meets.meetID, meetID), eq(meets.workspaceID, wsID)))
      .limit(1);
    console.log(Meet);

    const Invitees = await db
      .select({
        inviteesID: invitees.inviteeID,
        inviteesName: users.name,
        inviteesRole: members.role,
      })
      .from(invitees)
      .innerJoin(users, eq(invitees.inviteeID, users.userID))
      .innerJoin(
        members,
        and(
          eq(invitees.inviteeID, members.memberID),
          eq(invitees.workspaceID, members.workspaceID)
        )
      )
      .where(and(eq(invitees.meetID, meetID), eq(invitees.workspaceID, wsID)));
    
      const meetDashboard = {
        Meet: Meet[0],
        Invitees : Invitees,
      };

      res.json(meetDashboard);

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in meet dashboard" });
  }
};
