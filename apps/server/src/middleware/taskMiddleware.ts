import { NextFunction, Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { workspaces } from "../model/Workspace";
import { tasks } from "../model/Task";
import { assignees } from "../model/TaskAssignee";
import { and, eq } from "drizzle-orm";

export const getTaskDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const wsID: any = req.params.wsid;
  const taskID: any = req.params.taskid;

  try {
    const workspace = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.workspaceID, wsID))
      .limit(1);

    if (workspace.length == 0) {
      return res.status(400).send({ error: "Workspace doen't exist" });
    }

    const task = await db
      .select()
      .from(tasks)
      .where(eq(tasks.taskID, taskID))
      .limit(1);

    if (task.length == 0)
      return res.status(400).send({ error: "Task doesn't exist" });

    res.locals.taskTitle = task[0].title;
    res.locals.taskDescription = task[0].description;
    res.locals.taskDeadline = task[0].deadline;
    res.locals.taskStatus = task[0].status;

    const taskMem = await db
    .select()
    .from(assignees)
    .where(eq(assignees.taskID, taskID))

    console.log(taskMem);

    res.locals.assignees = taskMem;

    next();

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};
