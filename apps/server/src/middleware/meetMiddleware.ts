import { NextFunction, Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { meets } from "../model/Meet";
import { invitees } from "../model/MeetInvitee";
import { and, eq } from "drizzle-orm";

export const meetExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const meetID: any = parseInt(req.params.meetID, 10);
    if (isNaN(meetID)) {
      return res.status(400).send("Invalid meetID");
    }
    const wsID = req.workspace.workspaceID;

    const Meet = await db
      .select({
        meetID: meets.meetID,
        title: meets.title,
        workspaceID: meets.workspaceID,
        organizerID : meets.organizerID,
      })
      .from(meets)
      .where(and(eq(meets.meetID, meetID), eq(meets.workspaceID, wsID)))
      .limit(1);

    if (Meet.length > 0) {
      req.meet = Meet[0];
      console.log(req.meet);
      next();
    } else {
      res.status(404).send({ Message: "Meet Doesn't Exist" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in Meet exist Middleware" });
  }
};

export const authorizeInvitee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID: any = req.user.userID;
    const wsID = req.workspace.workspaceID;
    const meetID = req.meet.meetID;
    if (req.workspace.projectManager !== userID) {
      const isInvitee = await db
        .select()
        .from(invitees)
        .where(and(eq(invitees.workspaceID, wsID), eq(invitees.inviteeID, userID)))
        .limit(1);

      if (isInvitee.length === 0) {
        res.send("You have not been invited to this meet");
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        message: "Internal server error in authorize invitee middleware",
      });
  }
};

// export const getTaskDetails = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const wsID: any = req.params.wsID;
//   const taskID: any = req.params.taskID;

//   try {
//     const Task = await db
//       .select()
//       .from(tasks)
//       .where(and(eq(tasks.workspaceID, wsID), eq(tasks.taskID, taskID)))
//       .limit(1);

//     console.log(Task);

//     if (Task.length == 0)
//       return res.status(404).send({ error: "Task doesn't exist" });

//     res.locals.taskTitle = Task[0].title;
//     res.locals.taskDescription = Task[0].description;
//     res.locals.taskDeadline = Task[0].deadline;
//     res.locals.taskStatus = Task[0].status;

//     console.log("Saved");

//     const Assignees = await db
//       .select({
//         name: users.name,
//       })
//       .from(assignees)
//       .where(and(eq(assignees.workspaceID, wsID), eq(assignees.taskID, taskID)))
//       .innerJoin(users, eq(users.userID, assignees.assigneeID));

//     res.locals.assignees = Assignees;

//     /*
//     const taskMem = await db
//     .select()
//     .from(assignees)
//     .where(eq(assignees.taskID, taskID))

//     console.log(taskMem);

//     res.locals.assignees = taskMem;
//     */
//     next();
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .send({ message: "Internal server error in task Middleware" });
//   }
// };
