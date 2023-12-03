"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Tasks from "./tasks";

type stream = {
  objectID: number;
  objectStatus: string;
  objectTitle: string;
  objectType: string;
  objectDescription: string;
  created_at: string;
  meetDate?: string;
  TaskDeadline?: string;
};

export default function StreamPage() {
  const params = useParams();
  const workspaceId = params["id"] as string;

  const [data, setData] = useState<Array<stream>>([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3500/api/${workspaceId}/stream`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        isLoading(false);
        setData(data["Stream"]);
        console.log(data["Stream"]);
      });
  }, [workspaceId]);

  if (loading) return <div className="text-red-500">Loading...</div>;

  return (
    <>
      {data?.map((item, id) => (
        <Tasks
          key={id}
          id={item.objectID}
          type={item.objectType}
          workspaceId={workspaceId}
          title={item.objectTitle}
          date={item.meetDate || item.TaskDeadline}
          status={item.objectStatus}
        />
      ))}
    </>
  );
}
