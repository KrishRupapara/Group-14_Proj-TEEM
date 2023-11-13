"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Icons } from "@/components/ui/icons";


import Link from 'next/link';
import {zodResolver} from '@hookform/resolvers/zod'
import {z, ZodType} from 'zod'
import {useForm} from 'react-hook-form'
import { cn } from '@/lib/utils';
import getGoogleUrl from '@/utils/getGoogleurl';


type Inputs = {
    name : string
    email : string 
    password : string 
}

// export const userInfoSchema = z.object({
//     name: z.string().trim().min(2,{message:"Name must be 2 or more characters long"}).max(50),
//     email: z.string().email({message:'A email is recuired.'}).trim().toLowerCase(),
//     password: z.string().trim().min(8).max(30)
// })
export default function UserAuthForm() {

    const [isLoading, setIsLoading] = useState(false);

    const [user,setUser]= useState({
        name:"",
        email:"",
        password:"",
      });
    
      async function onSubmit(data: formSchema) {
        
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

          if(res.errors) {

          }

        } catch (err) {
          console.log(err);
        } finally {
           setIsLoading(false);
        }

        // if(password.length<8)
        // {
        //     setError('password must be at least 8 character long');
        // }
        // else if(!/\d/.test(password))
        // {
        //     setError('password must conatain at least one number');
        // }
        // else if(!/[A-Z]/.test(password))
        // {
        //     setError('password must conatain at least one uppercase character');
        // }
        // else
        //     setError('');
      } 
      const schema = z.object({
        name: z.string().trim().min(2).max(50),
        email: z.string().email(),
        password: z.string().trim().min(8).max(30)
        .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
        .regex(new RegExp(".*[a-z].*"), "One lowercase character")
        .regex(new RegExp(".*\\d.*"), "One number")
        .regex(
          new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
          "One special character"
        )
        });

        type formSchema = z.infer<typeof schema>


      const {register,handleSubmit, formState: {errors, isSubmitting}}= useForm<formSchema>({
        resolver: zodResolver(schema)
        });
    
  return (

    // <div>
    <div className='bg-gray-300 h-screen signup-bg'>
        <div className='h-[6rem] flex flex-row justify-between items-center px-5'>
                <Image src="/img/logoblack.png" alt="Image Not found" width={140} height={150}/>
                <Image src="/img/butterfly.png" alt="Image Not found" width={80} height={80}/>
        </div>
        <div className='h-[100vh-6rem] flex flex-row'>
            <div className="h-full w-1/3 flex flex-col justify-end place-items-start">
              <Image src="/img/doodleleft.png" alt="Image Not found" width={300} height={250}/>
            </div>
            
            <div className='h-full w-1/2 mx-auto p-4'>
                {/* card */}
                <form action="" onSubmit={handleSubmit(onSubmit)} className=" mx-auto h-full flex flex-col justify-center">
                <div className='h-[59.1vh] w-full py-2 flex flex-col justify-around items-center '>
                    <h2 className='font-bold text-2xl text-slate-700 pb-3'>Sign up with TEEM for free</h2> 
                        {/* name */}
                        <div className='flex flex-col w-3/5 mx-auto py-1'>
                        <label htmlFor="name" id="name" className='font-bold mb-1'>Enter Your Full Name</label>
                        <input 
                        {...register("name")}
                        id="name"
                        placeholder="name"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isLoading}
                        //onChange={(e) => setUser({ ...user, password: e.target.value })}
                        
                        className=' rounded-xl bg-gray-200 p-3' 

                        onChange={(e)=>{
                            setUser({
                                ...user,
                                name:e.target.value
                            })
                        }}
                        value={user.name}
                        />
                        {errors.name && (
                            <p className='text-red-500'>{`${errors.name.message}`}</p>
                        )}
                        </div>
                        {/* email */}
                        <div className='flex flex-col w-3/5 mx-auto py-1'>
                        <label htmlFor="email" id="email" className='font-bold mb-1'>Enter Your Email</label>
                        <input 
                        {...register("email")}
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        //onChange={(e) => setUser({ ...user, email: e.target.value })}

                        className=' rounded-xl bg-gray-200 p-3' 
                        onChange={(e)=>
                            setUser({
                                ...user,
                                email:e.target.value
                            })
                        }
                        value={user.email}/>
                        {errors.email && (
                            <p className='text-red-500'>{`${errors.email.message}`}</p>
                        )}
                        </div>
                        {/* password */}
                        <div className='flex flex-col w-3/5 mx-auto py-1'>
                        <label htmlFor="password" id="password" className='font-bold mb-1'>Enter Your Password</label>
                        <input 
                        {...register("password")}
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isLoading}
                        //onChange={(e) => setUser({ ...user, password: e.target.value })}

                        className=' rounded-xl bg-gray-200 p-3' 
                        onChange={(e)=>{
                            setUser({
                                ...user,
                                password:e.target.value
                            })
                            // setPassword(e.target.value);
                            // setError('');
                        }}
                        value={user.password}/>
                        {errors.password && (
                            <p className='text-red-500'>{`${errors.password.message}`}</p>
                        )}
                        {/* <p>{error}</p> */}
                        </div>
                        <div className={cn(isLoading && 'cursor-not-allowed', ' flex flex-col w-3/5 mx-auto py-1 ' )}>
                            <button disabled={isLoading}
                            type="submit" 
                            className=' bg-orange-300 rounded-xl py-3 px-3 font-bold text-white text-lg flex items-center justify-center'>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Get Started</button>
                        </div>
                    </div>

                    <div className=' h-[20vh] w-full flex flex-col justify-around items-center'>
                        <p>--------------------------OR--------------------------</p>
                        <div className='flex flex-col w-3/5 mx-auto py-1'>
                            <button disabled={isLoading}
                            
                            className=' rounded-xl py-2 px-3 flex items-center justify-center bg-white border border-black hover:bg-gray-300 hover:font-bold'>
                            <a href={getGoogleUrl()} className={cn(isLoading && 'cursor-not-allowed', " flex items-center justify-center py-1")} >
                            {isLoading?(
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                            <Image src="/img/googlelogo.png" alt='image not found' width={20} height={20}/>
                            )}{" "}
                                {/* <Image src="/img/googlelogo.png" alt='image not found' width={20} height={20}/> */}
                                &nbsp; Sign Up with Google
                                </a></button>
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
                        
                        <span>Already have an account? <Link href='/login' className='text-blue-800 underline underline-offset-2'>Log in</Link></span>
                        
                    </div>
                {/* {JSON.stringify(user)} */}
                </form>
                </div>
                <div className="h-full w-1/4 flex flex-col justify-end place-items-end">
                <Image src="/img/doodleright.png" alt="Image Not found" width={180} height={230}/>
                </div>
                {/* <div className="h-full w-1/2 signup-right flex flex-col items-center justify-center">
          <Image
            src="/img/signup1.png"
            alt="image not found"
            width={500}
            height={500}
          />
        </div> */}
      </div>
    </div>

  );
}
