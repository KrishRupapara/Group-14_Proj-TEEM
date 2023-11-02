import { Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { and, eq } from "drizzle-orm";

import { workspaces } from "../model/Workspace";
import { members } from "../model/Workspace";
import { assignees } from "../model/TaskAssignee";
import { tasks } from "../model/Task";

import { wsTokenOptions } from "../services/workspaceServices";
import { invitees } from "../model/MeetInvitee";
import { meets } from "../model/Meet";

export const getPeople = async (req: Request, res: Response) => {
  const wsID = parseInt(req.params.wsID, 10);
  console.log(wsID);
  // const wsID = req.params.wsID;
  if (isNaN(wsID) || !Number.isInteger(wsID)) {
    return res.status(400).send({ message: "Invalid workspace ID" });
  }

  // const user_id = res.locals.userid;
  try {
    const Manager = await db
      .select({
        userID: users.userID,
        emailID: users.emailId,
      })
      .from(workspaces)
      .innerJoin(users, eq(workspaces.projectManager, users.userID))
      .where(eq(workspaces.workspaceID, wsID));
    console.log(Manager);

    const Teammate = await db
      .select({
        userID: members.memberID,
        emailID: users.emailId,
        role: members.role,
      })
      .from(members)
      .innerJoin(users, eq(members.memberID, users.userID))
      .where(and(eq(members.workspaceID, wsID), eq(members.role, 0)));
    console.log(Teammate);

    const Client = await db
      .select({
        userID: members.memberID,
        emailID: users.emailId,
        role: members.role,
      })
      .from(members)
      .innerJoin(users, eq(members.memberID, users.userID))
      .where(and(eq(members.workspaceID, wsID), eq(members.role, 2)));
    console.log(Teammate);

    const Collaborator = await db
      .select({
        userID: members.memberID,
        emailID: users.emailId,
        role: members.role,
      })
      .from(members)
      .innerJoin(users, eq(members.memberID, users.userID))
      .where(and(eq(members.workspaceID, wsID), eq(members.role, 1)));
    console.log(Teammate);

    const People = {
      Manager: Manager,
      Teammate: Teammate,
      Collaborator: Collaborator,
      Client: Client,
    };
    console.log(People);

    return res.json(People);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error in people" });
  }
};

export const getYourWork = async (req: Request, res: Response) => {
  const wsID = parseInt(req.params.wsID, 10);
  const user_id = res.locals.userid;

  const Work = await db
    .select({
      taskID: tasks.taskID,
      taskTitle: tasks.title,
      taskStatus: tasks.status,
      taskDeadline: tasks.deadline,
      taskType: tasks.taskType,
    })
    .from(tasks)
    .innerJoin(assignees, eq(tasks.taskID, assignees.taskID))
    .where(
      and(eq(assignees.workspaceID, wsID), eq(assignees.assigneeID, user_id))
    );

  console.log(Work);
  res.json(Work);
};

export const getUpcoming = async (req: Request, res: Response) => {
  const wsID = parseInt(req.params.wsID, 10);
  const user_id = res.locals.userid;

  const upcomingTask = await db
    .select({
      taskID: tasks.taskID,
      taskTitle: tasks.title,
      taskStatus: tasks.status,
      taskDeadline: tasks.deadline,
      taskType: tasks.taskType,
    })
    .from(tasks)
    .innerJoin(assignees, eq(tasks.taskID, assignees.taskID))
    .where(
      and(eq(assignees.workspaceID, wsID), eq(assignees.assigneeID, user_id))
    );

  console.log(upcomingTask);

  const upcomingMeet = await db
    .select({
      taskID: meets.meetID,
      taskTitle: meets.title,
      //   taskStatus: meets.,
      taskDeadline: meets.meetTime,
      taskType: meets.duration,
    })
    .from(meets)
    .innerJoin(invitees, eq(meets.meetID, invitees.meetID))
    .where(
      and(eq(invitees.workspaceID, wsID), eq(invitees.inviteeID, user_id))
    );

  console.log(upcomingMeet);

  const Upcomig = {
    upcomingMeet: upcomingMeet,
    upcomingTask: upcomingTask,
  };
  //   res.json(Work);
};
