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
            Email: [{}],
            Role: [{}],
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "Email" });
    const router = useRouter();

    const onFormSubmit = (data) => {
        let email=data.Email;
        let role=data.Role;
        // console.log(email);
        // console.log(role);
        try {
            const res = fetch("http://localhost:3500/api/Invite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email,role}),
            }).then((res) => res.json());
            // console.log(res.message);
            router.push("/Profile");
        } catch (err: any) {
            console.log("Login failed", err.message);
        }

    };


    return (
        <div className='Invitationbg h-screen'>
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
                className='ml-5'
            />
            <div className='flex flex-col w-2/6 mx-auto my-10'>
                <h1 className='font-bold text-3xl mt-7 mx-auto'>Invite your team</h1>
                <div className='flex flex-col mt-10'>
                    <p className='m-3 font-bold'>Workspace members</p>

          <div className="flex justify-content">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <button
                className="border border-xl rounded-xl bg-blue-600 m-1 p-2"
                onClick={() => append({})}
              >
                Add member
              </button>

                            <div className='flex flex-col' >
                                {fields.map(({ id }, index) => {
                                    return <div className='flex'>
                                        <input
                                            id="members"
                                            placeholder="Enter members email by Comma"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="off"
                                            autoCorrect="off"
                                            required
                                            className='border rounded-xl p-2 m-1'
                                            {...register(`Email.${index}.Email` as any)}
                                        />


                                        <select id="Role" required className='border rounded-xl p-2 m-1' {...register(`Role.${index}`)}>
                                            {/* <option disabled selected>Choose a role</option> */}
                                            <option value="collaborator">collaborator</option>
                                            <option value="Manager">Manager</option>
                                        </select>

                                        <button className="border bg-blue-600 m-2 p-1 rounded-xl py-1" onClick={() => remove(index)}>Erase</button>
                                    </div>
                                })}

                                <div className='flex flex-col mx-auto mt-2 text-[#295BE7] underline'>
                                    <button type='submit' className="">
                                        Invite with link
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
