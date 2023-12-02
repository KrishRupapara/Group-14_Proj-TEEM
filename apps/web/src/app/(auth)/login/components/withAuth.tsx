"use client";

import { sessionStatus } from "@/utils/session";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: any){
    return function withAuth(props: any){

        const session = sessionStatus;
        useEffect(()=>{
            if(!session){
                redirect('/');
            }
        },[]);

        if(!session){
            return null;
        }

        return <Component {...props}/>
    };
}