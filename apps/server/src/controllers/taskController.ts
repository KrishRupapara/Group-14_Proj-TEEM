import { NextFunction, Request, Response } from "express";
import { db } from "../config/database";
import { users } from "../model/User";
import { and, eq } from "drizzle-orm";
import { getDecodedToken } from "../services/sessionServies";
import { sendTask } from "../services/sendTask";
import { signJWT } from "../utils/jwt";

import { tasks } from "../model/Task";
import { workspaces } from "../model/Workspace";
import { members } from "../model/Workspace";
import { assignees } from "../model/TaskAssignee";
import { timestamp } from "drizzle-orm/pg-core";
import {updateProjectProgress} from "../utils/progress"

export const assignTaskGet = async (req: Request, res: Response) => {
  res.send("<h1>You can create new Task</h1>");
};

export const assignTaskPost = async (req: Request, res: Response) => {

  var { title, description, taskType, deadline, Assignees = [] } = req.body;
  const wsID = parseInt(req.params.wsid, 10);


  if (isNaN(wsID)) {
    return res.status(400).send("Invalid wsID");
  }
  // const user_id = res.locals.userid;
  const Workspace = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.workspaceID, wsID))
    .limit(1);

  if (Workspace.length == 0) {
    return res.status(400).send({ error: "Workspace doen't exist" });
  }

  if (!(title && deadline)) {
    return res.status(400).send({ error: "Title is required" });
  }

  console.log(deadline);
  const nonmemberAssignee: string[] = []; //users which are not part of workspace
  const assignee: string[] = []; //users which are part of workspace
  const unregisteredAssignee: string[] = []; //users which are part of workspace

  try {
    const task_id = await db
      .insert(tasks)
      .values({
        title: title,
        description: description,
        taskType : taskType,
        deadline: deadline,
        workspaceID: Workspace[0].workspaceID,
      })
      .returning({ task_id: tasks.taskID });

    console.log(task_id[0].task_id);

    for (const Assignee of Assignees) {
      const { assignee_id } = Assignee;

      const User = await db
        .select()
        .from(users)
        .where(eq(users.emailId, assignee_id))
        .limit(1);

      console.log(assignee_id);
      console.log(User[0]);

      if (User.length > 0) {
        const member = await db
          .select()
          .from(members)
          .where(
            and(
              eq(members.workspaceID, Workspace[0].workspaceID),
              eq(members.memberID, User[0].userID)
            )
          )
          .limit(1);

        console.log(member[0]);

        if (member.length === 0) {
          // Handle unregistered team members
          nonmemberAssignee.push(assignee_id);
        } else {
          assignee.push(assignee_id);
          // Add registered members to the workspace
          await db.insert(assignees).values({
            taskID: task_id[0].task_id,
            workspaceID: Workspace[0].workspaceID,
            assigneeID: member[0].memberID,
          });
        }
      } else {
        unregisteredAssignee.push(assignee_id);
      }
    }

    if (nonmemberAssignee.length > 0 || unregisteredAssignee.length > 0) {
      res.status(201).send({
        message: "Task assigned only to workspace member",
        memberAssignee: assignee,
        NonmemberAssignee: nonmemberAssignee,
        unregisteredAssignee: unregisteredAssignee,
      });
    } else {
      res.send({ message: "Task assigned successfully", assignee });
    }

    const updatedProgress = await updateProjectProgress(wsID);
    console.log({updated_progress : updatedProgress});

    // await sendTask(Workspace[0].title, title, assignee); // send mail to assignees(only member)
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).send({
    Title: res.locals.taskTitle,
    Description: res.locals.taskDescription,
    Deadline: res.locals.taskDeadline,
    Status: res.locals.taskStatus,
    Assignees: res.locals.assignees,
  });
};

export const editTaskDetails = async (req: Request, res: Response) => {
  const wsID: any = req.params.wsid;
  const taskID: any = req.params.taskid;

  var { title, description, deadline } = req.body;

  try {
    if (title !== res.locals.taskTitle) {
      await db
        .update(tasks)
        .set({ title: title })
        .where(and(eq(tasks.workspaceID, wsID), eq(tasks.taskID, taskID)));
    }

    if (description !== res.locals.taskDescription) {
      await db
        .update(tasks)
        .set({ description: description })
        .where(and(eq(tasks.workspaceID, wsID), eq(tasks.taskID, taskID)));
    }

    if (deadline !== res.locals.taskDeadline) {
      await db
        .update(tasks)
        .set({ deadline: deadline })
        .where(and(eq(tasks.workspaceID, wsID), eq(tasks.taskID, taskID)));
    }

    res.status(200).send("Task Details Edited Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};

export const addTaskAssignees = async (req: Request, res: Response) => {
  const wsID: any = req.params.wsid;
  const taskID: any = req.params.taskid;

  var { Assignees = [] } = req.body;

  console.log(Assignees.length);

  if (Assignees.length === 0) 
     res.send({ message: "Please add assignees" });

  try {
    const nonmemberAssignee: string[] = []; //users which are not part of workspace
    const assignee: string[] = []; //users which are part of workspace
    const unregisteredAssignee: string[] = []; //users which are part of workspace

    for (const Assignee of Assignees) {
      const { assignee_id } = Assignee;


      if(assignee_id !== undefined)
      {
      console.log("Defined");
      const User = await db
        .select()
        .from(users)
        .where(eq(users.emailId, assignee_id))
        .limit(1);

      if (User.length > 0) {
        const member = await db
          .select()
          .from(members)
          .where(
            and(
              eq(members.workspaceID, wsID),
              eq(members.memberID, User[0].userID)
            )
          )
          .limit(1);

        console.log(member[0]);

        if (member.length === 0) {
          // Handle unregistered team members
          nonmemberAssignee.push(assignee_id);
        } else {
          assignee.push(assignee_id);
          // Add registered members to the workspace
          await db.insert(assignees).values({
            taskID: taskID,
            workspaceID: wsID,
            assigneeID: member[0].memberID,
          });
        }
      } else {
        unregisteredAssignee.push(assignee_id);
      }
    

    if (nonmemberAssignee.length > 0 || unregisteredAssignee.length > 0) {
      res.status(201).send({
        message: "Task assigned only to workspace member",
        memberAssignee: assignee,
        NonmemberAssignee: nonmemberAssignee,
        unregisteredAssignee: unregisteredAssignee,
      });
    } else {
      res.send({ message: "Assigned Members Added", assignee });
    }
  }

  else{
    res.send("Can't Add Empty Assignee");
  }
  }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};

export const removeTaskAssignees = async (req: Request, res: Response) => {
  const wsID: any = req.params.wsid;
  const taskID: any = req.params.taskid;

  var { Assignees = [] } = req.body;
  const unregisteredAssignee: string[] = [];
    
  if (Assignees.length === 0) 
     res.send({ message: "Please add assignees" });

  try {
     
     for(const Assignee of Assignees)
     {
       const {assignee_id} = Assignee

       const User = await db
        .select()
        .from(users)
        .where(eq(users.emailId, assignee_id));

        if(User.length !== 0)
        {
           await db
            .delete(assignees)
            .where(and(eq(assignees.workspaceID, wsID), eq(assignees.taskID, taskID), eq(assignees.assigneeID, User[0].userID)))
    
        }

        else{
             unregisteredAssignee.push(assignee_id);
        }


     }

     res.send({message: "Assignees Deleted Succesfully"});
 
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};
