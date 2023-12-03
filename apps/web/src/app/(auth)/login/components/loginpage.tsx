"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
// import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { useToast } from "@/components/ui/use-toast";

export default function Loginpage() {
  const router = useRouter();
  // const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => res.json());

      console.log(res);

      if (res.message == "Login successful") {
        toast.success("Login successful");

        setTimeout(() => {
          router.push(`dashboard`);
        }, 700);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="h-screen signup-bg sm:text-3xl xl:text-lg">
      <div className="h-[6rem] flex flex-row justify-between items-center px-5 ">
        <Image
          src="/img/logoblack.png"
          alt="Image Not found"
          width={140}
          height={150}
        />
        <Image
          src="/img/butterfly.png"
          alt="Image Not found"
          width={80}
          height={80}
        />
      </div>
      <Toaster />
      <div className="h-[calc(100vh-6rem)] flex flex-row">
        {/* <div className="h-full w-1/3 flex flex-col justify-end place-items-start">
                      <Image src="/img/doodleleft.png" alt="Image Not found" width={300} height={250}/>
                    </div> */}
        <div className="h-full xl:w-1/2 sm:w-2/3 mx-auto p-4">
          {/* card */}
          <form
            action=""
            onSubmit={onSubmit}
            className=" mx-auto h-full flex flex-col justify-center w-full"
          >
            <div className="sm:h-[30vh] xl:h-[40vh]  w-full py-2 flex flex-col justify-around items-center">
              <h2 className="font-bold xl:text-2xl text-slate-700">
                Login with TEEM for free
              </h2>
              {/* name */}
              {/* email */}
              <div className="flex flex-col xl:w-3/5 sm:w-full mx-auto py-1">
                <label htmlFor="email" id="email" className="font-bold mb-1">
                  Enter Your Email
                </label>
                <input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  //onChange={(e) => setUser({ ...user, email: e.target.value })}

                  className="rounded-xl bg-white p-3"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value,
                    })
                  }
                  value={user.email}
                />
              </div>
              {/* password */}
              <div className="flex flex-col xl:w-3/5 sm:w-full mx-auto py-1">
                <label
                  htmlFor="password"
                  id="password"
                  className="font-bold mb-1"
                >
                  Enter Your Password
                </label>
                <input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={isLoading}
                  //onChange={(e) => setUser({ ...user, password: e.target.value })}

                  className="bg-white rounded-xl p-3"
                  onChange={(e) => {
                    setUser({
                      ...user,
                      password: e.target.value,
                    });
                  }}
                  value={user.password}
                />
              </div>
            </div>

            <div className="xl:h-[20vh] sm:h-[15vh] w-full flex flex-col justify-around items-center ">
              <div className="flex flex-col xl:w-3/5 sm:w-full  mx-auto">
                <button
                  disabled={isLoading}
                  type="submit"
                  className=" bg-blue-500 rounded-xl py-3 px-3 hover:bg-blue-700 font-bold text-white text-lg flex items-center justify-center"
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </button>
              </div>
              <span>
                Doesn&apos;t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="text-blue-800 underline underline-offset-2"
                >
                  Sign up
                </Link>
              </span>
              <span>
                Forgot Password?{" "}
                <Link
                  href="/forgotpassword"
                  className="text-blue-800 underline underline-offset-2"
                >
                  Forgotpassword
                </Link>
              </span>
            </div>
            {/* {JSON.stringify(user)} */}
          </form>
        </div>
        {/* <div className="h-full w-1/4 flex flex-col justify-end place-items-end">
                <Image src="/img/doodleright.png" alt="Image Not found" width={180} height={230}/>
                </div> */}
        {/* <div className='h-full w-1/2 signup-right flex flex-col items-center justify-center'>
                <Image src="/img/signup1.png" alt="image not found" width={500} height={500} />
            </div> */}
        T
      </div>
    </div>
  );
}
