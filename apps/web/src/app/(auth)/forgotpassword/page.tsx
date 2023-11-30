"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Forgotpassword() {

    const [email, setemail] = useState({ email: "" });
    const router = useRouter();

    async function onSubmit() {

        try {
            const res = await fetch("http://localhost:3500/api/forgotPasswordPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }).then((res) => res.json());

            if (res.message == "OTP sent successfully") {
                toast.success("OTP sent successfully");
                // router.push("/dashboard");
                router.push(`verify?email=${email.email}`);
            } else {
                toast.error(res.message);
                // setstatus(res.message);
            }
            console.log(email);
        } catch (err: any) {
            console.log("Login failed", err.message);
        }
    }

    return (
        <div className="w-screen h-screen bg-gradient-to-b from-primaryblue to-white flex flex-row justify-between items-center">
            <div className='lg:w-1/3 md:w-1/2 sm:w-1/2 mx-auto flex flex-col justify-around'>
                <div className='mx-auto mb-10' >
                    <h2 className='text-3xl'> Forgot Password?</h2>
                </div>
                <form onSubmit={onSubmit}>
                    {/* <label htmlFor=""></label> */}
                    <Label className='text-lg' htmlFor="email">
                        Email:
                    </Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        required
                        autoComplete="email"
                        autoCorrect="off"
                        onChange={(e) => {
                            setemail({
                                email: e.target.value,
                            });
                        }}
                        value={email.email}
                    />

                    <div className='w-full mx-auto mt-3 flex justify-around'>
                        <button type="submit" className='bg-orange-400 rounded-full py-2 px-3 hover:bg-orange-600'>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
