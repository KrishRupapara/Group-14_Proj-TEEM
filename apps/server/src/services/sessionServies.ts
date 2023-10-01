import type { SessionType } from "../model/Session";
import { client as redisClient } from "../config/redisConnect";
import { CookieOptions } from "express";

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 86400,
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 86400 * 30,
};

export const createSession = async (
  id: string,
  refresh_token: string,
  userAgent: string,
  isVerified?: boolean
) => {
  const session: SessionType = {
    id,
    refresh_token,
    userAgent,
    isVerified: isVerified && true,
  };

  redisClient.set(id, JSON.stringify(session), "EX", 60 * 60 * 24 * 30);

  return session;
};

export const findSessions = async (userId: string) => {
  const val = redisClient.get(userId, (err, reply) => {
    if (err) {
      throw Error(err.message);
    }
  });
  return val;
};
