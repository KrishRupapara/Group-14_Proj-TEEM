"use client";

import { useEffect, useState } from "react";
import PeopleCard from "./PeopleCard";

export type peopleType = {
  People: {
    Manager: Array<person>;
    Client: Array<person>;
    Collaborator: Array<person>;
    Teammate: Array<person>;
  };
};

export type person = {
  userID: number;
  userName: string;
  emailID: string;
  role: string;
};

export default function PeopleComponent({ wsID }: { wsID: string }) {
  const [data, setData] = useState<peopleType>();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3500/api/${wsID}/people`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data.People.Manager[0].emailID);
        isLoading(false);
      });
  }, [wsID]);

  if (loading) return <div>Loading....</div>;

  return (
    <>
      {/* Project Manager */}
      <PeopleCard type="Manager" people={data?.People.Manager} />
      <PeopleCard type="Client" people={data?.People.Client} />
      <PeopleCard type="Collaborator" people={data?.People.Collaborator} />
      <PeopleCard type="Teammate" people={data?.People.Teammate} />
    </>
  );
}
