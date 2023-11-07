"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Invitation() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      test: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "test" });
  const router = useRouter();
  const [St, setSt] = React.useState("");
  // const [Emails, setEmails] = React.useState("");
  const [Emails, setEmails] = useState<string[]>(new Array().fill(""));
  // const [Invite, setInvite] = React.useState({
  //     members: "",
  //     workspace: "",
  // })

  const onFormSubmit = (data: any) => {
    console.log(data);
  };

  async function onsubmit() {
    try {
      // const Invite = Emails.split(",");
      // if (Invite.members.length > 0) {
      //     const res = await fetch("http://localhost:3500/api/", {
      //         method: "POST",
      //         headers: {
      //             "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify(Invite),
      //     }).then((res) => res.json());
      //     console.log(res.message);
      //     router.push("/Profile");
      // } else {
      //     // toast.error("Please fill required fields");
      //     setSt("hii");
      // }
    } catch (err: any) {
      console.log("Login failed", err.message);
    }
  }

  return (
    <div className="Invitationbg h-screen">
      <Image
        alt="Image Not Found"
        src={"/img/Invitation_bg.png"}
        className="-z-10 absolute"
        fill
      />
      <img
        src="/img/Logo_black.png"
        style={{ width: "10%", height: "10%" }}
        alt="Image Not Found"
        className="ml-5"
      />
      <div className="flex flex-col w-2/6 mx-auto my-10">
        <h1 className="font-bold text-3xl mt-7 mx-auto">Invite your team</h1>
        <div className="flex flex-col mt-10">
          <p className="m-3 font-bold">Workspace members</p>
          {/* <input type="text" className='border rounded-xl p-2' /> */}

          <div className="flex justify-content">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <button
                className="border border-xl rounded-xl bg-blue-600 m-1 p-2"
                onClick={() => append({})}
              >
                Add member
              </button>

              <div className="flex flex-col">
                {fields.map(({ id }, index) => {
                  return (
                    <div className="flex" key={id}>
                      {" "}
                      <input
                        id="members"
                        placeholder="Enter members email by Comma"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        required
                        className="border rounded-xl p-2 m-1"
                        // {...register(`test.${index}.values`)}
                        onChange={(e) => {
                          // setEmails(e.target.value)
                          // setInvite({
                          //     ...Invite,
                          //     members: e.target.value
                          // })
                        }}
                        value={Emails}
                      />
                      <select className="border rounded-xl p-2 m-1">
                        <option value="Manager">Manager</option>
                        <option value="User">collaborator</option>
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

              {/* <input
                                id="members"
                                placeholder="Enter members email by Comma"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                required
                                className='border rounded-xl p-2'
                                onChange={(e) => {
                                    setEmails(e.target.value)
                                    // setInvite({
                                    //     ...Invite,
                                    //     members: e.target.value
                                    // })
                                }}
                                value={Emails} /> */}

              {/* <button className='border border-xl bg-blue-600 m-1 rounded-lg'>hiiiii</button> */}
            </form>
          </div>

          {/* onChange={(e) => {
                            setInvite({
                                ...Invite,
                                members: e.target.value
                            })
                        }} */}

          <div className="flex flex-col mx-auto mt-2 text-[#295BE7] underline">
            <button className="" onClick={onsubmit}>
              Invite with link
            </button>
            {St}
          </div>
        </div>
        {/* <div className='flex flex-col mt-10'>
                    <p className='m-3 font-bold'>Invite to Workspace</p> */}
        {/* <input type="text" className='border rounded-xl p-2' /> */}

        {/* <input
                        id="workspace"
                        placeholder="workspace"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        required
                        className='border rounded-xl p-2'
                        onChange={(e) => {
                            setInvite({
                                ...Invite,
                                workspace: e.target.value
                            })
                        }}
                        value={Invite.workspace} />

                    <div className='flex flex-col mx-auto mt-2 text-[#295BE7] underline'>
                        <Link href={"#"}><p className='mx-auto'>I'll do this later</p></Link>
                    </div>
                </div> */}
      </div>
    </div>
  );
}
