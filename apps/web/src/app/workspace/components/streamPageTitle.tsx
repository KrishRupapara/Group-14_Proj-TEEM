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

  return (
    <>
      <div className="col-start-1 grid gap-0 content-end p-2 whitespace-nowrap">
        {loading ? (
          <>
            <div className="animate-pulse w-32 h-3 rounded-md mb-2 bg-slate-600"></div>
            <div className="animate-pulse w-16 h-3 rounded-md bg-slate-700 mb-2"></div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <p className="text-lg">{data.projectManager}</p>
          </>
        )}
      </div>
      <div className="col-end-6">
        {loading ? (
          <div className="animate-pulse w-32 h-32 rounded-full bg-slate-600 my-2"></div>
        ) : (
          <Progressbar percent={data.progress} />
        )}
      </div>
    </>
  );
}
