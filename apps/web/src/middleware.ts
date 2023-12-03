import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (!req.cookies.get("accessToken")) {
    const url = new URL("/signup", req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }

  if (routes.includes(req.nextUrl.pathname) && req.cookies.get("accessToken")) {
    const url = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.next();
}

const routes = ["/"];

export const config = {
  matcher: [
    "/profile",
    "/dashboard",
    "/workspace/",
    "/workspace/:id",
    "/workspace/:id/:slug/",
    "/calendar",
  ],
};
