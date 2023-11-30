"use client";
import React from "react";
import Image from "next/image";
import NavComponent from "@/components/Navbar";
import Navbar from "@/components/newNavbar";
import { useState } from "react";
// import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function Dashboardfile() {
  const [isLoading, setIsLoading] = useState(false);

  const [workspace, setWorkspace] = useState({
    title: "",
    type: "",
    description: "",
  });

  const members = [
    {
      Email: "",
      Role: ""
    },
  ];

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

  const onFormSubmit = (data: any) => {
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
  const notify = () => toast("Wow so easy!");
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
    <>
      <div className="relative lg:h-[4rem] md:h-[3rem] sm:h-[2rem] z-20">
        <Navbar />
      </div>
      <div className="bg-[#eef6ff] lg:min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-2rem)] flex flex-col">
        {/* <div className="z-0 overflow-hidden absolute h-screen w-full">
          <div className="overflow-hidden opacity-85 h-60 w-60 absolute left-0 right-0 bottom-0 top-0 rounded-full border-2  m-auto"></div>
          <div className="overflow-hidden opacity-85 h-[40rem] w-[40rem] absolute left-0 right-0 bottom-0 top-0 rounded-full border-2  m-auto"></div>
          <div className="overflow-hidden opacity-85 h-[60rem] w-[60rem] absolute left-0 right-0 bottom-0 top-0 rounded-full border-2  m-auto"></div>
          <div className="overflow-hidden opacity-85 h-[80rem] w-[80rem] absolute left-0 right-0 bottom-0 top-0 rounded-full border-2  m-auto"></div>
          <div className="overflow-hidden opacity-85 h-[100rem] w-[100rem] absolute left-0 right-0 bottom-0 top-0 rounded-full border-2  m-auto"></div>
        </div> */}

        <div className="flex flex-col">
          <div className="h-full lg:w-2/4 md:w-fit mx-auto card-bg relative">
            {/* card */}
            <form
              action=""
              onSubmit={handleSubmit(onFormSubmit)}
              className=" mx-auto h-full flex flex-col justify-center"
            >
              <div className="py-2 flex flex-col justify-around items-start">
                <div className="mx-auto">
                  <h2 className="font-bold mb-6 mt-14 md:mt-8 text-3xl text-black">
                    Let&apos;s build a Workspace
                  </h2>
                </div>
                <div className="flex flex-col w-3/5 mx-auto py-1 mt-3">
                  <label
                    htmlFor="workspacetitle"
                    id="workspacetitle"
                    className=" mb-1 text-center text-black font-medium"
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

                    className="border-2 border-gray-300 rounded-lg bg-white p-3"
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
                    className="mb-1 text-center text-black font-medium"
                  >
                    Workspace Type
                  </label>
                  <select
                    id="countries"
                    //className="bg-gray-50  text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                    className="bg-white  border-2 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-900 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(t) =>
                      setWorkspace({
                        ...workspace,
                        type: t.target.value,
                      })
                    }
                  >
                    <option disabled selected value="">
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
                    className=" mb-1 text-center text-black font-medium"
                  >
                    Workspace Description
                  </label>
                  <br />
                  <textarea
                    className="border-2 border-gray-300 rounded-md p-2 bg-white"
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
                    className="border border-xl hover:bg-blue-800 text-white rounded-xl bg-blue-600 mx-auto my-3 p-2 lg:w-2/5 sm:1/4"
                    onClick={() => append({})}
                  >
                    Add member
                  </button>

                  <div className="flex flex-col mx-auto">
                    {fields.map(({ id }, index) => {
                      return (
                        <div className="lg:flex">
                          <input
                            id={`members[${index}].Email`}
                            placeholder="Enter members email"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            required
                            className="border-2 border-gray-300 rounded-xl p-2 bg-white m-1"
                            {...register(`members.${index}.Email` as any)}
                          />

                          <select
                            id={`members[${index}].Role`}
                            required
                            className="bg-white  border-2 border-gray-300 focus:ring-blue-900 focus:border-blue-500 rounded-xl p-2 m-1"
                            {...register(`members.${index}.Role` as any)}
                          >
                            <option disabled selected value="">
                              Choose a role
                            </option>
                            <option value="collaborator">collaborator</option>
                            <option value="Manager">Manager</option>
                          </select>

                          {/* <button
                            type="button"
                            className="border text-white hover:bg-blue-800 bg-blue-600 m-2 p-1 rounded-xl py-1"
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Erase
                          </button> */}
                        {fields.length > 1 && (
                          <button
                            className="border bg-blue-600 m-2 p-1 rounded-xl py-1"
                            onClick={() => remove(index)}
                          >
                            Erase
                          </button>
                        )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/*Submit Button*/}
                <div className="flex flex-col w-3/5 mx-auto py-1 mt-4">
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
    </>
  );
}
