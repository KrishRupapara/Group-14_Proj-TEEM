// "use client";
import Tasks from "./tasks";
// import { useState, useEffect } from "react";

type dataType = {
  meetID?: number;
  meetTitle?: string;
  meetAgenda?: string;
  meetOrganizer?: string;
  meetTime?: string;
  taskID?: number;
  taskTitle?: string;
  taskStatus?: string;
  taskDeadline?: string;
  taskType?: string;
  taskDescription?: string;
};

export default function WorkComponent({
  wsID,
  type,
  tasks,
}: {
  wsID: string;
  type: string;
  tasks: Array<dataType>;
}) {
  // const [tasks, setTasks] = useState<Array<dataType>>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/${wsID}/your${type}`, {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setTasks(data);
  //       setLoading(false);
  //     });
  // }, [wsID, type]);

  // if (loading) {
  //   return (
  //     <div className="w-screen h-screen bg-gradient-to-b from-primaryblue to-white">
  //       <div className="w-4/5 mx-auto pt-5">
  //         <div className="flex justify-center items-center h-screen">
  //           <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primaryblue"></div>
  //         </div>
  //         <h1>Loading....</h1>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-primaryblue to-white">
      <div className="w-4/5 mx-auto pt-5">
        {tasks.length === 0 ? (
          <h1>Nothing to show</h1>
        ) : (
          <>
            <h1 className="text-3xl font-semibold">Your {type}</h1>
            {tasks.map((task) =>
              type === "Meet" ? (
                <Tasks
                  key={task.meetID!}
                  id={task.meetID!}
                  type={type.toLowerCase()}
                  workspaceId={wsID}
                  title={task.meetTitle!}
                  date={task.meetTime!}
                  status={"status"}
                />
              ) : (
                <Tasks
                  key={task.taskID!}
                  id={task.taskID!}
                  type={type.toLowerCase()}
                  workspaceId={wsID}
                  title={task.taskTitle!}
                  date={task.taskDeadline!}
                  status={task.taskStatus!}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}
