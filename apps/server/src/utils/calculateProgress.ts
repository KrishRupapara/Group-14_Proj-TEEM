import { tasks } from "../model/Task";
import { db } from "../config/database";
import { and, eq } from "drizzle-orm";
export const calculateProjectProgress = async (wsID: any) => {
  const tTask = await db
    .select()
    .from(tasks)
    .where(eq(tasks.workspaceID, wsID));
  const totalTasks = tTask.length;

  if (totalTasks === 0) {
    return 0; // To avoid division by zero
  }
  
  const cTask = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.workspaceID, wsID), eq(tasks.status, "2")));
  const completedTasks = cTask.length;


  return (completedTasks / totalTasks) * 100;
};
