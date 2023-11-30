"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState } from "react";
// import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

export default function Dashboardfile() {
  const [isLoading, setIsLoading] = useState(false);

  const [workspace, setWorkspace] = useState({
    title: "",
    type: "",
    description: "",
  });

  const members = [{ Email: "", Role: "" }];

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      members: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });
  const router = useRouter();

  const onFormSubmit = (data) => {
    const { members } = data;
    // console.log(email[1]);
    // console.log(members);
    // console.log(data);
    // console.log(workspace.title);
    let title = workspace.title;
    let type = workspace.type;
    let description = workspace.description;
    try {
      const res = fetch("http://localhost:3500/api/createworkspace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, type, description, members }),
      }).then((res) => res.json());

      router.push("/dashboard");
    } catch (err: any) {
      console.log("Login failed", err.message);
    }
  };

  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault();
  //   try {
  //     setIsLoading(true);

  //     const res = await fetch("http://localhost:3500/api/createworkspace", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(workspace),
  //     }).then((res) => res.json());
  //     console.log(res.message);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  return (
    // bg-gradient-to-tr from-[#E0CBA8] via-[#779FA1] to-[#E0CBA8]

    <div className="bg-[#eef6ff] flex flex-col h-screen ">
      <div className="z-0 fixed  w-full">
        <div className="overflow-hidden opacity-85 h-60 w-60 absolute left-0 right-0 bottom-0 top-0 rounded-full border-2  m-auto"></div>
        <div className="overflow-hidden opacity-85 h-[40rem] w-[40rem] absolute left-0 right-0 bottom-0 top-0 rounded-full border-2  m-auto"></div>
        <div className="overflow-hidden opacity-85 h-[60rem] w-[60rem] absolute left-0 right-0 bottom-0 top-0 rounded-full border-2  m-auto"></div>
        <div className="overflow-hidden opacity-85 h-[80rem] w-[80rem] absolute left-0 right-0 bottom-0 top-0 rounded-full border-2  m-auto"></div>
        <div className="overflow-hidden opacity-85 h-[100rem] w-[100rem] absolute left-0 right-0 bottom-0 top-0 rounded-full border-2  m-auto"></div>
        {/* <svg className="absolute m-auto left-0 top-0 right-0 bottom-0">
          <circle
            className="ml-30"
            cx="0"
            cy="0"
            r="40"
            stroke="green"
            stroke-width="4"
            fill="yellow"
          />
        </svg> */}
      </div>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="w-full fixed z-20">
          <Navbar />
        </div>
        {/* Doodles */}
        {/* <div>
          <div className="absolute right-0 top-3">
            <img
              src="/img/uploadcloud.png"
              alt="Not found"
              width={90}
              height={90}
            />
            <img
              src="/img/deadman.png"
              alt="Not found"
              width={90}
              height={90}
            />
          </div>
          <div className="absolute right-24 top-20">
            <img
              src="/img/speaker.png"
              alt="Not found"
              width={45}
              height={45}
            />
          </div>
          <div className="absolute bottom-0 left-1">
            <img
              src="/img/rightarrowsmulti.png"
              alt="Not found"
              width={200}
              height={200}
            />
          </div>
        </div> */}
        <div className="h-full w-1/2 mt-[8vh] mx-auto p-4 card-bg relative">
          {/* card */}
          <form
            action=""
            onSubmit={handleSubmit(onFormSubmit)}
            className=" mx-auto h-full flex flex-col justify-center"
          >
            <div className="h-[40vh] w-full py-2 flex flex-col justify-around items-start">
              <div className="mx-auto">
                <h2 className="font-bold mb-6 text-3xl text-black">
                  Let&apos;s build a Workspace
                </h2>
              </div>

              {/* <div className="flex flex-col ml-32  ">
                <img
                  className="h-auto max-w-full"
                  className="h-auto max-w-ful
                  src="/img/arrow-left.png"
                  alt="arrow down"
                  width={90}
                  height={90}
                />
              </div> */}
              {/* <h4 className="text-center">
                {" "}
                Workspaces are shared environment where teams can collaborate on
                tasks, cycles and projects.
              </h4> */}
              {/* name */}
              {/* Workspace Name */}
              <div className="flex flex-col w-3/5 mx-auto py-1 mt-3">
                <label
                  htmlFor="workspacetitle"
                  id="workspacetitle"
                  className="font-bold mb-1 text-center text-black font-medium"
                >
                  Workspace Name
                </label>
                <input
                  id="workspacename"
                  placeholder="TEEM Project"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                  //onChange={(e) => setUser({ ...user, email: e.target.value })}

                  className=" border border-gray-300 bg-white p-3"
                  onChange={(e) =>
                    setWorkspace({
                      ...workspace,

                      title: e.target.value,
                    })
                  }
                  value={workspace.title}
                />
              </div>

              {/* Workspace Type */}
              <div className="flex flex-col w-3/5 mx-auto py-1 mt-3">
                <label
                  htmlFor="email"
                  id="email"
                  className="font-bold mb-1 text-center text-black font-medium"
                >
                  Workspace Type
                </label>
                <select
                  id="countries"
                  className="bg-white  border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(t) =>
                    setWorkspace({
                      ...workspace,
                      type: t.target.value,
                    })
                  }
                >
                  <option disabled selected>
                    Choose a type
                  </option>
                  <option value="US">B2B Tech Startups</option>
                  <option value="CA">B2C Tech Startups</option>
                  <option value="CA">D2C E-Commerce</option>
                  <option value="FR">Marketing Agencies</option>
                  <option value="DE">Software Agencies</option>
                  <option value="DE">Healthcare</option>
                  <option value="DE">Education</option>
                  <option value="DE">Retail</option>
                </select>
              </div>
              {/* Workspace Description */}
              <div className="flex flex-col w-3/5 mx-auto py-1 mt-3">
                <label
                  htmlFor="email"
                  id="email"
                  className="font-bold mb-1 text-center text-black font-medium"
                >
                  Workspace Description
                </label>
                <br />
                <textarea
                  className=" p-2 bg-white border-2"
                  rows={4}
                  placeholder="Write a brief description of your workspace"
                  required
                  onChange={(d) =>
                    setWorkspace({
                      ...workspace,
                      description: d.target.value,
                    })
                  }
                  value={workspace.description}
                ></textarea>
              </div>

              <div className="flex flex-col w-3/5 mx-auto py-1 mt-3">
                <button
                  className="border border-xl rounded-xl bg-blue-600 m-1 p-2 w-2/5"
                  onClick={() => append({})}
                >
                  Add member
                </button>

                <div className="flex flex-col">
                  {fields.map(({ id }, index) => {
                    return (
                      <div className="flex">
                        <input
                          id="members"
                          placeholder="Enter members email by Comma"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="off"
                          autoCorrect="off"
                          required
                          className="border rounded-xl p-2 m-1"
                          {...register(`members.${index}.Email` as any)}
                        />

                        <select
                          id="Role"
                          required
                          className="border rounded-xl p-2 m-1"
                          {...register(`members.${index}.Role` as any)}
                        >
                          {/* <option disabled selected>Choose a role</option> */}
                          <option value="collaborator">collaborator</option>
                          <option value="Manager">Manager</option>
                        </select>

                        <button
                          className="border bg-blue-600 m-2 p-1 rounded-xl py-1"
                          onClick={() => remove(index)}
                        >
                          Erase
                        </button>
                      </div>
                    );
                  })}

                  {/* <div className='flex flex-col mx-auto mt-2 text-[#295BE7] underline'>
                  <button type='submit' className="">
                    Invite with link
                  </button>
                </div> */}
                </div>
              </div>

              {/*Submit Button*/}
              <div className="flex flex-col w-3/5 mx-auto py-1 mt-10">
                <button
                  disabled={isLoading}
                  type="submit"
                  className=" bg-orange-400 rounded-full py-2 px-3 hover:bg-orange-600 font-bold text-white text-lg flex items-center justify-center"
                  // onClick={onSubmit}
                >
                  Continue
                </button>
              </div>
            </div>

            {/* {JSON.stringify(user)} */}
          </form>
        </div>
      </div>
    </div>
  );
}
