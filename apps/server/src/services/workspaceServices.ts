import { CookieOptions } from "express";

export const wsTokenOptions: CookieOptions = {
  maxAge: 86400,
  httpOnly: true,
  path: "/",
  secure: false,
};
