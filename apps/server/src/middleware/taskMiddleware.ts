import { NextFunction, Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { workspaces } from "../model/Workspace";
import { tasks } from "../model/Task";
import { assignees } from "../model/TaskAssignee";
import { and, eq } from "drizzle-orm";


export const taskExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 
  const wsID: any = req.params.wsID;
  const taskID: any = req.params.taskID;

  const Task = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.taskID, taskID), eq(tasks.workspaceID, wsID)));

    if(Task.length > 0)
     next();
  
    else{
      res.status(404).send({Message: "Task Doesn't Exist"});
    }


} 


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

    console.log('Saved');

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
    return res.status(500).send({ message: "Internal server error in task Middleware" });
  }
};
