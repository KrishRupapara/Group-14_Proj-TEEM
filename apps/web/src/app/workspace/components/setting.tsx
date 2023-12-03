"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import { useParams } from 'react-router-dom'
import { useParams } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

export default function Setting() {
  // const [hi, setHi] = useState("");

  const params = useParams();
  const id = params.id;

  // useEffect(()=> {
  //   setHi(id);
  // },[])

  const hi = ["jainam", "Shah", "three", "four", "five", "six"];

  const members = [
    {
      member_id: "",
      Role: "",
    },
  ];

  const [workspace, setWorkspace] = useState({
    title: "",
    type: "",
    description: "",
    members: members,
  });

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      members: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  // useEffect(() => {
  // const initialFieldsCount = 1; // Change this to the desired initial count
  // let isMounted = true;
  // if (isMounted) {
  //   for (let i = 0; i < initialFieldsCount; i++) {
  // append({ /* initial field values */ });
  //   }
  // }
  // return () => {
  //   isMounted = false;
  // };
  // }, [append]);

  // const { userId } = params;
  // const { id } = useParams();
  // const [values, setVa1uesJ = useState({
  //   name:
  //     email :

  // async function onFormSubmit() {

  //   let title = workspace.title;
  //   let type = workspace.type;
  //   let description = workspace.description;
  //   try {
  //     const res = fetch("http://localhost:3500/api/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ title, type, description }),
  //     }).then((res) => res.json());

  //     // router.push("/dashboard");

  //   } catch (err: any) {
  //     console.log("Login failed", err.message);
  //   }

  // };

  const onFormSubmit = (data: any) => {
    const { members } = data;

    let title = workspace.title;
    let type = workspace.type;
    let description = workspace.description;
    try {
      const res = fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/` + id + "/editWSDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, type, description, members }),
        }
      ).then((res) => res.json());

      // router.push("/dashboard");
    } catch (err: any) {
      console.log("Login failed", err.message);
    }
  };

  useEffect(() => {
    const once = () => {
      // console.log("check");

      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER}/api/` + id + "/editWSDetails")
        .then(
          (res) => {
            setWorkspace({
              ...workspace,
              title: res.data.title,
              type: res.data.type,
              description: res.data.description,
              members: res.data.Members,
            });
          } /*console.log(res)*/
        )
        .catch((err) => console.log(err));
      const initialFieldsCount = members.length;
      for (let i = 0; i < initialFieldsCount; i++) {
        append({});
      }
    };
    return () => once();
  }, []);

  return (
    <div className="w-screen min-h-[calc(100vh-7.9rem)] bg-gradient-to-b from-primaryblue to-white flex flex-row justify-between items-center">
      <div className="lg:w-1/3 md:w-1/2 sm:w-1/2 mx-auto flex flex-col justify-around">
        <div className="flex flex-col justify-around">
          <h1 className="text-2xl mb-4 mx-auto font-bold">Edit Workspace</h1>
          <form action="" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="flex flex-col">
              <label htmlFor="name" id="name" className="font-bold mb-1">
                Worksace Name
              </label>
              <input
                id="Worksace name"
                placeholder="Worksace name"
                type="text"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                className=" rounded-xl p-3"
                value={workspace.title}
                required
                onChange={(e) => {
                  setWorkspace({
                    ...workspace,
                    title: e.target.value,
                  });
                }}
              />
              <label htmlFor="Type" id="Type" className="font-bold mb-1 mt-2">
                Workspace Type
              </label>
              <select
                id="Workspace Type"
                required
                className="rounded-xl p-3"
                value={workspace.type}
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
              <label htmlFor="Type" id="Type" className="font-bold mb-1 mt-2">
                Workspace Description
              </label>

              <textarea
                className="rounded-xl p-3"
                rows={4}
                placeholder="Write a brief description of your workspace"
                required
                value={workspace.description}
                onChange={(d) =>
                  setWorkspace({
                    ...workspace,
                    description: d.target.value,
                  })
                }
              ></textarea>

              <label
                htmlFor="member"
                id="member"
                className="font-bold mb-1 mt-2"
              >
                member
              </label>
              {/* <div className="flex flex-col w-3/5 mx-auto py-1 mt-3"> */}
              <button
                className="border border-xl rounded-xl bg-blue-600 mb-3 p-2 lg:w-1/3 sm:w-1/3 justify-items-start"
                onClick={() => append({})}
              >
                Add member
              </button>
              <div className="flex flex-col justify-items-start">
                {fields.map(({ id }, index) => {
                  return (
                    <div className="lg:flex" key={id}>
                      <input
                        id="members"
                        placeholder="Enter members email"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        value={members[index].member_id}
                        required
                        className="border rounded-xl p-2 m-1"
                        {...register(`members.${index}.member_id` as any)}
                      />

                      <select
                        id="Role"
                        required
                        className="border rounded-xl p-2 m-1"
                        value={members[index].Role}
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
              </div>

              {/* } */}

              {/* </div> */}
              <button
                type="submit"
                className="border bg-blue-600 p-3 mt-3 rounded-xl py-1 mx-auto w-fit"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
