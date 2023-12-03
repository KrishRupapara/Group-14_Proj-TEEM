"use client";
import IconType from "@/components/ui/IconType";
import { rale } from "@/utils/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import EditTaskDialog from "./editTaskDialog";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import EditMeetDialog from "./editMeetDialog";

type dataType = {
  Invitees?: Array<inviteeType>;
  meet?: meetType;
  task?: taskType;
  Assignees?: Array<assigneeType>;
};

export type assigneeType = {
  assigneeID: number;
  assigneeName: string;
  assigneeRole: string;
  assigneeEmailID: string;
};

export type inviteeType = {
  inviteesID: number;
  inviteesName: string;
  inviteesRole: string;
  inviteesEmailID: string;
};

export type taskType = {
  taskID: number;
  title: string;
  description: string;
  taskType: string;
  deadline: string;
  status: string;
  workspaceID: number;
  createdAt: string;
};

export type meetType = {
  agenda: string;
  createdAt: string;
  description: string;
  endTime: string;
  meetDate: string;
  meetID: number;
  organizerID: number;
  startTime: string;
  title: string;
  venue: string;
  workspaceID: number;
};

export default function TaskPage({
  wsID,
  taskID,
  type,
}: {
  wsID: string;
  taskID: string;
  type: string;
}) {
  const [data, setData] = useState<dataType>({});
  const [loading, isLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(
      `http://localhost:3500/api/workspace/${wsID}/${type}/${taskID}/dashboard`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        isLoading(false);
        setData(data);
        console.log(data);
      });
  }, [wsID, taskID, type]);

  const Type = type[0].toUpperCase() + type.slice(1);

  const onDelete = () => {
    const res = fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/${wsID}/${taskID}/edit${Type}Details`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Task deleted successfully") {
          toast.success("Task deleted successfully");
          setTimeout(() => {
            router.push(`/workspace/${wsID}/stream`);
          }, 700);
        } else toast.error("Error in deleting task");
      });
  };

  if (loading) return <div className="text-red-500">Loading...</div>;

  return (
    <div className="w-screen h-[calc(100vh-5.1rem)] bg-gradient-to-b from-primaryblue to-white">
      <Toaster />
      <div className="w-4/5 mx-auto pt-5">
        <div className="bg-white px-10 rounded-2xl py-4 shadow-md">
          <div className="flex items-center justify-between border-b-2 pb-2">
            <div className="flex flex-col lg:flex lg:flex-row md:flex md:flex-row sm:flex sm:flex-row items-center justify-between gap-6">
              <IconType type={type} />
              <div>
                <h1 className="font-semibold text-2xl">
                  {type === "meet" ? data["meet"]?.title : data["task"]?.title}
                </h1>
                <p className={rale.className}>
                  {type === "meet"
                    ? new Date(data["meet"]?.meetDate!).toDateString()
                    : new Date(data["task"]?.deadline!).toDateString()}
                </p>
                {type === "meet" ? (
                  <p>
                    {data["meet"]?.startTime + " to " + data["meet"]?.endTime}
                  </p>
                ) : (
                  <p>{data["task"]?.deadline}</p>
                )}
              </div>
            </div>
            <h1 className="bg-buttonblue text-white lg:px-4 md:px-4 sm:px-5 py-2 tracking-wide lg:text-xl md:text-lg sm:text-md rounded-xl">
              {type === "meet"
                ? new Date(data["meet"]?.meetDate!) > new Date()
                  ? "Upcoming"
                  : "Done"
                : data["task"]?.status}
            </h1>
          </div>
          <div className="lg:px-20 md:px-15 sm:px-10 pt-2">
            {type === "meet" && (
              <div className="flex gap-5 items-center">
                <h1 className="text-xl font-bold">Agenda</h1>
                <p className={rale.className}>{data["meet"]?.agenda}</p>
              </div>
            )}
            <p className={rale.className}>
              {type === "meet"
                ? data["meet"]?.description
                : data["task"]?.description}
            </p>
          </div>
        </div>
        <div className="mt-5 bg-white px-10 pt-5 pb-10 rounded-2xl shadow-md">
          <h1 className="text-xl font-bold pb-4 border-b-2 border-black">
            {type === "meet" ? "Invitees" : "Assignee"}
          </h1>
          <div>
            {type === "meet"
              ? data["Invitees"]?.map((i, id) => (
                  <Assignee
                    key={id}
                    username={i.inviteesName}
                    role={i.inviteesRole}
                  />
                ))
              : data["Assignees"]?.map((i, id) => (
                  <Assignee
                    key={id}
                    username={i.assigneeName}
                    role={i.assigneeRole}
                  />
                ))}
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2 w-fit mx-auto">
          {type === "task" ? (
            <EditTaskDialog
              task={data["task"]!}
              assignee={data["Assignees"]!}
            />
          ) : (
            <EditMeetDialog meet={data["meet"]!} invitees={data["Invitees"]!} />
          )}
          <Button
            className="bg-delete text-xl px-24 py-2 hover:bg-delete"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

const Assignee = ({ username, role }: { username: string; role: string }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between mt-8 border-b-2",
        rale.className
      )}
    >
      <div className="flex items-center gap-6 pb-4">
        <FontAwesomeIcon
          icon={faUser}
          width={30}
          height={30}
          className="lg:h-12 md:h-10 sm:h-9"
        />
        <h1 className="text-xl font-semibold">{username}</h1>
      </div>
      <h2 className="text-xl">{role}</h2>
    </div>
  );
};
