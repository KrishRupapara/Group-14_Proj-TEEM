import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = await fetch("http://localhost:3500/api/auth/check", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  if (res.message !== "success") {
    const url = new URL("/signup", req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }

  console.log("all is well");

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/dashboard",
    "/workspace/:id",
    "/workspace/:id/:slug/",
  ],
};
