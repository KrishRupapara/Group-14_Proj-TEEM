import React from "react";
import Tasks from "../../components/tasks";
import Progressbar from "@/components/ui/progress-bar";

export default function page() {
  return (
    <div className="Projectbg h-[calc(100vh-5.1rem)]">
      <div className="w-fit lg:w-4/5 md:w-4/5 sm:w-4/5 mx-auto p-10">
        <div className="border rounded-2xl bg-white flex flex-col lg:flex lg:flex-row md:flex md:flex-row sm:flex sm:flex-row gap-4 justify-between px-5">
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
