"use client";

import Progressbar from "@/components/ui/progress-bar";
import { useState, useEffect } from "react";

export default function StreamTitle({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3500/api/workspace/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data[0]);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className="col-start-1 grid gap-0 content-end p-2 whitespace-nowrap">
        <p className="font-bold text-3xl">{data.title}</p>
        <p className="text-lg">{data.projectManager}</p>
      </div>
      <div className="col-end-6">
        <Progressbar percent={data.progress} />
      </div>
    </>
  );
}
