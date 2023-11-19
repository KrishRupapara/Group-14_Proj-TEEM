import React from "react";
import Tasks from "../../components/tasks";
import Progressbar from "@/components/ui/progress-bar";
import TaskPage from "../../components/taskPage";

export default function page() {
  return (
    <div className="Projectbg h-[calc(100vh-5.1rem)]">
      <div className="w-4/5 mx-auto p-10">
        <div className="border rounded-2xl bg-white grid grid-cols-4 gap-4 px-5">
          <div className="col-start-1 grid gap-0 content-end p-2 whitespace-nowrap">
            <p className="font-bold text-3xl">Project Name</p>
            <p className="text-lg">Manager name</p>
          </div>
          <div className="col-end-6">
            <Progressbar percent={75} />
          </div>
        </div>
        <>
          <Tasks type="meet" />
          <Tasks type="task" />
        </>
      </div>
    </div>
  );
}
