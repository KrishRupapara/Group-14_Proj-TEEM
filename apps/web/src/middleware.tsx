import { sessionStatus } from "./utils/session";
import { NextRequest,NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    console.log("middleware executed")
    const authToken=request.cookies.get("auaccessToken")?.value;
    
    if(!authToken)
    {
        return NextResponse.redirect(new URL("/signup",request.url))
    }
    //return NextResponse.redirect(new URL('/home', request.url))
  }

  export const config = {
    matcher: ['/dashboard'],
  }

// const protectedRoutes = ["/dashboard","/signup"];

// export default function middleware(req:any){
//     if(!sessionStatus && protectedRoutes.includes(req.nextUrl.pathname)){
//         const absoluteURL = new URL("/",req.nextUrl.origin);
//         return NextResponse.redirect(absoluteURL.toString());
//     }
// }