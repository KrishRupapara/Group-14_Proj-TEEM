import { tasks } from "../model/Task";
import { db } from "../config/database";
import { and, eq } from "drizzle-orm";
import { workspaces } from "../model/Workspace";
export const updateProjectProgress = async (wsID: any) => {
  try {
    const tTask = await db
      .select()
      .from(tasks)
      .where(eq(tasks.workspaceID, wsID));
    const totalTasks = tTask.length;

    let Progress = 0;
    let roundedProgress = 0;
    if (totalTasks > 0) {
      const cTask = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.workspaceID, wsID), eq(tasks.status, "Done")));
      const completedTasks = cTask.length;

      Progress = (completedTasks / totalTasks) * 100;
      roundedProgress = Math.floor(Progress);
      /*
      console.log({
        totalTasks: totalTasks,
        completedTasks: completedTasks,
        Progress: Progress,
        roundedProgress: roundedProgress,
      });
      */
    }
    const updatedProgress = await db
      .update(workspaces)
      .set({ progress: roundedProgress })
      .where(eq(workspaces.workspaceID, wsID))
      .returning({ updatedProgress: workspaces.progress });

    return updatedProgress[0].updatedProgress;
  } catch (err) {
    console.log(err);
  }
};
