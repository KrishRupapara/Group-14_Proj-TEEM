"use client";
import Progressbar from "@/components/ui/progress-bar";
import NavComponent from "@/components/Navbar";
import NavBar from "@/components/newNavbar";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [loading, isLoading] = useState(true);
  const [data, setData] = useState([
    { workspaceID: 0, title: "", description: "", progress: "" },
  ]);

  useEffect(() => {
    fetch(`http://localhost:3500/api/dashboard`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        isLoading(false);
        console.log(data);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  console.log(data)
  return (
    <div className="bg-gradient-to-b from-primaryblue to-white">
      <NavComponent />

      <div className="w-5/6 mx-auto h-full">
        {/* Task */}
        <div className="h-[calc(100vh-5rem)] w-full">
          <div className="h-1/4"></div>
          <div className="grid grid-cols-3 h-3/4 w-full p-14 gap-10 ">
            
              
             {data?.map((item) => (
              <Link
                href={`/workspace/${item.workspaceID}/tasks`}
                key={item.workspaceID}
              >
                <WorkspaceContainer
                  title={item.title}
                  description={item.description}
                  progress={item.progress}
                />
              </Link>
            ))} 
          </div>
        </div>
      </div>
    </div>
  );
}

const WorkspaceContainer = ({
  title,
  description,
  progress,
}: {
  title: string;
  description: string;
  progress: string;
}) => {
  return (
    <div className="rounded-xl flex justify-around items-center p-2 bg-white shadow-xl">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p>{description}</p>
      </div>
      <Progressbar percent={parseInt(progress)} />
    </div>
  );
};
