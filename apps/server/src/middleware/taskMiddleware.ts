import { NextFunction, Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { tasks } from "../model/Task";
import { assignees } from "../model/TaskAssignee";
import { and, eq } from "drizzle-orm";

export const taskExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskID: any = parseInt(req.params.taskID, 10);
    if (isNaN(taskID)) {
      return res.status(400).send("Invalid taskID");
    }
    const wsID = req.workspace.workspaceID;

    const Task = await db
      .select({
        taskID: tasks.taskID,
        title: tasks.title,
        workspaceID: tasks.workspaceID,
      })
      .from(tasks)
      .where(and(eq(tasks.taskID, taskID), eq(tasks.workspaceID, wsID)))
      .limit(1);

    if (Task.length > 0) {
      req.task = Task[0];
      console.log(req.task);
      next();
    } else {
      res.status(404).send({ Message: "Task Doesn't Exist" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in task exist Middleware" });
  }
};

export const authorizeAssignee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID: any = req.user.userID;
    const wsID = req.workspace.workspaceID;
    const taskID = req.task.taskID;
    if (req.workspace.projectManager !== userID) {
      const isAssignee = await db
        .select()
        .from(assignees)
        .where(and(eq(assignees.workspaceID, wsID), eq(assignees.assigneeID, userID)))
        .limit(1);

      if (isAssignee.length === 0) {
        res.send("You have not been assigned to this task");
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
        message: "Internal server error in authorize assignee middleware",
      });
  }
};

export const getTaskDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const wsID: any = req.params.wsID;
  const taskID: any = req.params.taskID;

  try {
    const Task = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.workspaceID, wsID), eq(tasks.taskID, taskID)))
      .limit(1);

    console.log(Task);

    if (Task.length == 0)
      return res.status(404).send({ error: "Task doesn't exist" });

    res.locals.taskTitle = Task[0].title;
    res.locals.taskDescription = Task[0].description;
    res.locals.taskDeadline = Task[0].deadline;
    res.locals.taskStatus = Task[0].status;

    console.log("Saved");

    const Assignees = await db
      .select({
        name: users.name,
      })
      .from(assignees)
      .where(and(eq(assignees.workspaceID, wsID), eq(assignees.taskID, taskID)))
      .innerJoin(users, eq(users.userID, assignees.assigneeID));

    res.locals.assignees = Assignees;

    /*
    const taskMem = await db
    .select()
    .from(assignees)
    .where(eq(assignees.taskID, taskID))

    console.log(taskMem);

    res.locals.assignees = taskMem;
*/
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal server error in task Middleware" });
  }
};
