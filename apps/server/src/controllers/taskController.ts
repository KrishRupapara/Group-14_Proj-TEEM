import { Request, Response } from "express";
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

export const assignTaskGet = async (req: Request, res: Response) => {
  res.send("<h1>You can create new Task</h1>");
};

export const assignTaskPost = async (req: Request, res: Response) => {
  var { title, description, deadline, Assignees = [] } = req.body;
  const wsID = parseInt(req.params.wsID, 10);

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
        deadline: deadline,
        workspaceID: Workspace[0].workspaceID,
      })
      .returning({ task_id: tasks.taskID });

    console.log(task_id[0].task_id);

    for (const Assignee of Assignees) {
      const assignee_id = Assignee;

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
              eq(members.workspaceID, Workspace[0].workspaceID),
              eq(members.memberID, User[0].userID)
            )
          )
          .limit(1);

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

    // await sendTask(Workspace[0].title, title, assignee); // send mail to assignees(only member)
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};
