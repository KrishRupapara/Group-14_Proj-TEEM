import { tasks } from "../model/Task";
import { db } from "../config/database";
import { and, eq } from "drizzle-orm";
import { workspaces } from "@server/model/Workspace";
export const calculateProjectProgress = async (wsID: any) => {
  const tTask = await db
    .select()
    .from(tasks)
    .where(eq(tasks.workspaceID, wsID));
  const totalTasks = tTask.length;

  var Progress;

  if (totalTasks === 0) {
    Progress = 0; 
  }
  else{
      const cTask = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.workspaceID, wsID), eq(tasks.status,"Done")));
      const completedTasks = cTask.length;

      Progress = (completedTasks / totalTasks) * 100;
  }


  await db.update(workspaces)
     .set({ progress: Progress})
     .where(eq(workspaces.workspaceID, wsID));
};
