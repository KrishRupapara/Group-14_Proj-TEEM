// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const accessToken = req.cookies.get("accessToken");

//   console.log("middleware", req.nextUrl.pathname, accessToken);
// //

//   if (!accessToken) {
//     const url = new URL("/signup", req.nextUrl.origin);
//     return NextResponse.redirect(url.toString());
//   }

//   if (routes.includes(req.nextUrl.pathname) && accessToken) {
//     const url = new URL("/dashboard", req.nextUrl.origin);
//     return NextResponse.redirect(url.toString());
//   }

//   return NextResponse.next();
// }

// const routes = ["/"];

// export const config = {
//   matcher: [
//     "/profile",
//     "/dashboard",
//     "/workspace/",
//     "/workspace/:id",
//     "/workspace/:id/:slug/",
//     "/calendar",
//   ],
// };
