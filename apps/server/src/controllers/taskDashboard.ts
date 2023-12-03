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
import { updateProjectProgress } from "../utils/progress";

import { client as redisClient } from "../config/redisConnect";

export const taskDashboard = async (req: Request, res: Response) => {
  try {
    // const userID = req.user.userID;
    const wsID = req.workspace.workspaceID;
    const task_ID = req.task.taskID;

    const cachedTask = await redisClient.get(`task:${task_ID}`, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
      }
      return data;
    });

    if (cachedTask) {
      return res.status(200).json(JSON.parse(cachedTask));
    }

    const Task = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.taskID, task_ID), eq(tasks.workspaceID, wsID)))
      .limit(1);
    console.log(Task);
    const Assignees = await db
      .select({
        assigneeID: assignees.assigneeID,
        assigneeName: users.name,
        assigneeRole: members.role,
        assigneeEmailID: users.emailId,
      })
      .from(assignees)
      .innerJoin(users, eq(assignees.assigneeID, users.userID))
      .innerJoin(
        members,
        and(
          eq(assignees.assigneeID, members.memberID),
          eq(assignees.workspaceID, members.workspaceID)
        )
      )
      .where(
        and(eq(assignees.taskID, task_ID), eq(assignees.workspaceID, wsID))
      );
    console.log(Assignees);

    const taskDashboard = {
      task: Task[0],
      Assignees: Assignees,
    };

    await redisClient.set(
      `task:${task_ID}`,
      JSON.stringify(taskDashboard),
      "EX",
      60 * 60 * 24
    );

    if (cachedTask) {
      return res.status(200).json(JSON.parse(cachedTask));
    }

    res.status(200).json(taskDashboard);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in task dashboard" });
  }
};
