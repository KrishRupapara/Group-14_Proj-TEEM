"use client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCookies } from "next-client-cookies";

export default function DeleteTask({
  wsID,
  taskID,
  Type,
}: {
  wsID: string;
  taskID: string;
  Type: string;
}) {
  const cookies = useCookies();
  const onDelete = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/${wsID}/${taskID}/edit${Type}Details`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("accessToken"),
          cookie: cookies.get("refreshToken")!,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Task deleted successfully") {
          toast.success("Task deleted successfully");
        } else toast.error("Error in deleting task");
      });
  };

  return (
    <Button
      className="bg-delete text-xl px-24 py-2 hover:bg-delete"
      onClick={onDelete}
    >
      Delete
    </Button>
  );
}
