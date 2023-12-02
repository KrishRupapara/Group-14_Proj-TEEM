import { NextFunction, Request, Response } from "express";
import { db } from "../config/database";
import { users } from "../model/User";
import { and, eq } from "drizzle-orm";
import { getDecodedToken } from "../services/sessionServies";
import { sendTask } from "../services/sendTask";
import { signJWT } from "../utils/jwt";

import { tasks } from "../model/Task";
import { workspaces, members } from "../model/Workspace";

import { assignees } from "../model/TaskAssignee";
import { timestamp } from "drizzle-orm/pg-core";
import { updateProjectProgress } from "../utils/progress";

export const assignTaskGet = async (req: Request, res: Response) => {
  res.send("<h1>You can create new Task</h1>");
};

export const assignTaskPost = async (req: Request, res: Response) => {
  var { title, description, taskType, deadline, Assignees = [] } = req.body;
  const wsID = req.workspace.workspaceID;

  if (!(title && deadline)) {
    return res.status(400).send({ error: "Enter Mandatory Fields" });
  }

  // console.log(deadline);
  const nonmemberAssignee: string[] = []; //users which are not part of workspace
  const assignee: string[] = []; //users which are part of workspace
  const unregisteredAssignee: string[] = []; //users which are part of workspace

  try {
    const task_id = await db
      .insert(tasks)
      .values({
        title: title,
        description: description,
        taskType: taskType,
        deadline: new Date(deadline) as any,
        workspaceID: wsID,
      })
      .returning({ task_id: tasks.taskID });

    console.log(task_id[0].task_id);

    for (const assignee_id of Assignees) {
      const User = await db
        .select()
        .from(users)
        .where(eq(users.emailId, assignee_id))
        .limit(1);

      // console.log({ assignee_id: assignee_id });
      // console.log(User[0]);

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

        // console.log(member[0]);

        if (member.length === 0) {
          // Handle unregistered team members
          nonmemberAssignee.push(assignee_id);
        } else {
          assignee.push(assignee_id);
          // Add registered members to the workspace
          await db.insert(assignees).values({
            taskID: task_id[0].task_id,
            workspaceID: wsID,
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
      res.status(201).send({ message: "Task assigned successfully", assignee });
    }

    const updatedProgress = await updateProjectProgress(wsID);
    // console.log({ updated_progress: updatedProgress });

    // await sendTask(Workspace[0].title, title, assignee); // send mail to assignees(only member)
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};

export const editTaskDetailsGet = async (req: Request, res: Response) => {
  res.status(200).send({
    Title: res.locals.taskTitle,
    Description: res.locals.taskDescription,
    Deadline: res.locals.taskDeadline,
    Status: res.locals.taskStatus,
  });
};

export const editTaskDetailsPATCH = async (req: Request, res: Response) => {
  const wsID: any = req.params.wsID;
  const taskID: any = req.params.taskID;
 // const toDo: any = req.params.action;

  var { title, description, deadline, type, status } = req.body;

  try {

    if (title === undefined || description === undefined || type === undefined || status === undefined) {
      console.log(undefined);
      return res.status(400).json({ error: "Fields are required" });
    }
 else if (title === null || title === "") 
     return res.status(400).send({ error: "Title can not be empty"});

 else{
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
        .set({ deadline: new Date(deadline) as any })
        .where(and(eq(tasks.workspaceID, wsID), eq(tasks.taskID, taskID)));
    }

    if (status !== res.locals.taskStatus) {
      await db
        .update(tasks)
        .set({ status: status })
        .where(and(eq(tasks.workspaceID, wsID), eq(tasks.taskID, taskID)));
    }
    
   
    res.status(200).send({message: "Task Edited Successfully"})

  }
 } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};

export const showAssignees = async (req: Request, res: Response) => {
  const wsID: any = req.params.wsID;
  const taskID: any = req.params.taskID;

  console.log("Showing");

  try {
    /*
    const Assignees = await db
      .select({
        name: users.name,
      })
      .from(assignees)
      .where(and(eq(assignees.workspaceID, wsID), eq(assignees.taskID, taskID)))
      .innerJoin(users, eq(users.userID, assignees.assigneeID));

    console.log(Assignees[0]);
    */
    res.status(200).send({Assignees: res.locals.assignees});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};

export const editTaskAssigneesGet = async (req: Request, res: Response) => {
  showAssignees(req, res);
};

export const editTaskAssigneesPATCH = async (req: Request, res: Response) => {
  const wsID: any = req.params.wsID;
  const taskID: any = req.params.taskID;

  const nonmemberAssignee: string[] = []; //users which are not part of workspace
  const assignee: string[] = []; //users which are part of workspace
  const unregisteredAssignee: string[] = []; //users which are part of workspace

  var { Assignees = [] } = req.body;
  
  try{
  if(Assignees.length === 0)
    res.status(400).send({Error: "Can't Add Empty Assignees"});

    else{



    for (const Assignee of Assignees) {
      const { assignee_id } = Assignee;

      if (assignee_id !== undefined) {
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
            .where(and(eq(members.workspaceID, wsID), eq(members.memberID, User[0].userID)))
            .limit(1);

          console.log(member[0]);

          if (member.length === 0) {
            // Handle unregistered team members
            nonmemberAssignee.push(assignee_id);
          } else {
            assignee.push(assignee_id);
  
          }
        } else {
          unregisteredAssignee.push(assignee_id);
        }

        
    }
  }

    if(assignee.length === 0)
    {
        res.status(400).send({Error: "No changes made as no assignee is part of the workspace"})
        
    }

    else{
    await db
    .delete(assignees)
    .where(
      and(eq(assignees.workspaceID, wsID), eq(assignees.taskID, taskID))
    );

    for(var i = 0 ; i< assignee.length; ++i)
    { 
      const User = await db
          .select()
          .from(users)
          .where(eq(users.emailId, assignee[i]))
          .limit(1);

      await db
      .insert(assignees)
      .values({
        taskID: taskID,
        workspaceID: wsID,
        assigneeID: User[0].userID,
      });
    }

    if (nonmemberAssignee.length > 0 || unregisteredAssignee.length > 0) {
      res.status(201).send({
        message: "Task assigned only to workspace member",
        memberAssignee: assignee,
        NonmemberAssignee: nonmemberAssignee,
        unregisteredAssignee: unregisteredAssignee,
      });
    } 
    else {
      res.status(201).send({ message: "Assigned Members Added", assignee });
    }

  }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};

/*
export const settingsTaskGet = async (req:Request, res:Response) =>{
  
  res.status(200).send({
    Title: res.locals.taskTitle,
    Description: res.locals.taskDescription,
    Deadline: res.locals.taskDeadline,
    Status: res.locals.taskStatus,
    Assignees: res.locals.assignees,
  });

}


export const settingTasksPost = async (req: Request, res: Response) => {
  const wsID: any = req.params.wsID;
  const taskID: any = req.params.taskID;
  const toDo:any = req.params.toDo;

  if(toDo === 1)
    deleteTask(req, res);

    else{

  const nonmemberAssignee: string[] = []; //users which are not part of workspace
  const assignee: string[] = []; //users which are part of workspace
  const unregisteredAssignee: string[] = []; //users which are part of workspace

  var { title, description, deadline, Assignees = [] } = req.body;

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

    await db
      .delete(assignees)
      .where(
        and(eq(assignees.workspaceID, wsID), eq(assignees.taskID, taskID))
      );

    for (const Assignee of Assignees) {
      const { assignee_id } = Assignee;

      if (assignee_id !== undefined) {
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
      } else {
        res.send("Can't Add Empty Assignee");
      }
    }
    res.status(200).send("Task Details Edited Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in task" });
  }
}
};

*/

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
    // Assignees: res.locals.assignees,
  });
};

export const editTaskDetails = async (req: Request, res: Response) => {
  const wsID: any = req.params.wsID;
  const taskID: any = req.params.taskID;

  var { title, description, deadline, Assignees = [] } = req.body;

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
  const wsID: any = req.params.wsID;
  const taskID: any = req.params.taskID;

  var { Assignees = [] } = req.body;

  console.log(Assignees.length);

  if (Assignees.length === 0) res.send({ message: "Please add assignees" });

  try {
    const nonmemberAssignee: string[] = []; //users which are not part of workspace
    const assignee: string[] = []; //users which are part of workspace
    const unregisteredAssignee: string[] = []; //users which are part of workspace

    for (const Assignee of Assignees) {
      const { assignee_id } = Assignee;

      if (assignee_id !== undefined) {
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
      } else {
        res.send("Can't Add Empty Assignee");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};

export const removeTaskAssignees = async (req: Request, res: Response) => {
  const wsID: any = req.params.wsID;
  const taskID: any = req.params.taskID;

  var { Assignees = [] } = req.body;
  const unregisteredAssignee: string[] = [];

  if (Assignees.length === 0) res.send({ message: "Please add assignees" });

  try {
    for (const Assignee of Assignees) {
      const { assignee_id } = Assignee;

      const User = await db
        .select()
        .from(users)
        .where(eq(users.emailId, assignee_id));

      if (User.length !== 0) {
        await db
          .delete(assignees)
          .where(
            and(
              eq(assignees.workspaceID, wsID),
              eq(assignees.taskID, taskID),
              eq(assignees.assigneeID, User[0].userID)
            )
          );
      } else {
        unregisteredAssignee.push(assignee_id);
      }
    }

    res.send({ message: "Assignees Deleted Succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};

// delete task controller
export const deleteTask = async (req: Request, res: Response) => {
  try {
    // getting taskID from params
    const taskIDToDelete: any = req.params.taskID;
    //getting workspaceID from params
    const wsID: any = req.params.wsID;

    //delete task from task table
    await db.delete(tasks).where(eq(tasks.taskID, taskIDToDelete));

    //delete task from taskassignees table
    await db.delete(assignees).where(eq(assignees.taskID, taskIDToDelete));

    res.status(200).send({
      message: "Task deleted successfully",
      EXPECTED: "Task must be deleted from taskassignees table also"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};
