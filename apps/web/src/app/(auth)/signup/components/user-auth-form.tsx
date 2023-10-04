"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
// import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import Link from 'next/link';

export default function UserAuthForm() {
    
    const [isLoading, setIsLoading] = useState(false);

    const [user,setUser]= useState({
        name:"",
        email:"",
        password:"",
      });
    
      async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        try {
          setIsLoading(true);
    
          const res = await fetch("http://localhost:3500/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }).then((res) => res.json());
          console.log(res.message);
        } catch (err) {
          console.log(err);
        } finally {
           setIsLoading(false);
        }
      } 
  return (
    <div className='bg-gray-300 h-screen'>
        <div className='h-[4rem] signup-bg flex px-5'>
                <Image src="/img/logo.png" alt="Image Not found" width={150} height={150}/>
        </div>
        <div className='h-[calc(100vh-4rem)] flex'>
            <div className='h-full w-1/2 mx-auto p-4 card-bg'>
                {/* card */}
                <form action="" onSubmit={onSubmit} className=" mx-auto h-full ">
                <div className='h-[50vh] w-full py-2 flex flex-col justify-around items-center'>
                    <h2 className='font-bold text-2xl text-white'>Sign up with TEEM for free</h2> 
                        {/* name */}
                        <div className='flex flex-col w-3/5 mx-auto py-1'>
                        <label htmlFor="name" id="name" className='font-bold mb-1'>Enter Your Full Name</label>
                        <input 
                        id="name"
                        placeholder="name"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isLoading}
                        //onChange={(e) => setUser({ ...user, password: e.target.value })}
                        
                        className='border border-black rounded-lg bg-gray-200 p-3' 
                        onChange={(e)=>{
                            setUser({
                                ...user,
                                name:e.target.value
                            })
                        }}
                        value={user.name}/>
                        </div>
                        {/* email */}
                        <div className='flex flex-col w-3/5 mx-auto py-1'>
                        <label htmlFor="email" id="email" className='font-bold mb-1'>Enter Your Email</label>
                        <input 
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        //onChange={(e) => setUser({ ...user, email: e.target.value })}

                        className='border border-black rounded-lg bg-gray-200 p-3' 
                        onChange={(e)=>
                            setUser({
                                ...user,
                                email:e.target.value
                            })
                        }
                        value={user.email}/>
                        </div>
                        {/* password */}
                        <div className='flex flex-col w-3/5 mx-auto py-1'>
                        <label htmlFor="password" id="password" className='font-bold mb-1'>Enter Your Password</label>
                        <input 
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isLoading}
                        //onChange={(e) => setUser({ ...user, password: e.target.value })}

                        className='border border-black rounded-lg bg-gray-200 p-3' 
                        onChange={(e)=>{
                            setUser({
                                ...user,
                                password:e.target.value
                            })
                        }}
                        value={user.password}/>

                        </div>
                    </div>

                    <div className=' h-[30vh] w-full flex flex-col justify-around items-center'>
                        <p>--------------------------OR--------------------------</p>
                        <div className='flex flex-col w-3/5 mx-auto py-1'>
                            <button disabled={isLoading}
                            className='border border-black rounded-full py-2 px-3 hover:bg-gray-300 flex items-center justify-center bg-white'>
                            {isLoading?(
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                            <Icons.google className="mr-2 h-4 w-4" />
                            )}{" "}
                                {/* <Image src="/img/googlelogo.png" alt='image not found' width={20} height={20}/> */}
                                &nbsp; Sign Up with Google</button>
                        </div>
                        {/* <div className='flex flex-col w-3/5 mx-auto py-1'>
                            <button disabled={isLoading}
                            className='border border-black rounded-full py-2 px-3 hover:bg-gray-300 flex items-center justify-center bg-white'>
                            
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            <Image src="/img/slacklogo.png" alt='image not found' width={20} height={20}/>
                                &nbsp; Sign Up with Slack</button>
                        </div> */}
                        <div className='flex flex-col w-3/5 mx-auto py-1'>
                            <button disabled={isLoading}
                            type="submit" 
                            className='border border-black bg-blue-600 rounded-full py-2 px-3 hover:bg-blue-800 font-bold text-white text-lg flex items-center justify-center'>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Get Started</button>
                        </div>
                        <span>Already have an account? <Link href='/login' className='text-blue-800 underline underline-offset-2'>Log in</Link></span>
                        
                    </div>
                {/* {JSON.stringify(user)} */}
                </form>
            </div>
            <div className='h-full w-1/2 signup-right flex flex-col items-center justify-center'>
                <Image src="/img/signup1.png" alt="image not found" width={500} height={500} />
            </div>
        </div>
    </div>
  )
}
