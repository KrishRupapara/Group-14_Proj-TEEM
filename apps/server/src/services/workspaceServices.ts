import { CookieOptions } from "express";

export const wsTokenOptions: CookieOptions = {
   maxAge: 86400 ,  
   httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false,
  };