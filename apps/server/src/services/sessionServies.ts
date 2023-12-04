import type { SessionType } from "../model/Session";
import { client as redisClient } from "../config/redisConnect";
import { CookieOptions } from "express";
import jwt from "jsonwebtoken";

export const accessTokenCookieOptions: CookieOptions = {
  httpOnly: false,
  path: "/",
  secure: true,
  expires: new Date(Date.now() + 86400 * 1000),
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  expires: new Date(Date.now() + 30 * 86400 * 1000),
};

export const createSession = async (
  id: string,
  refresh_token: string,
  userAgent: string,
  isVerified: boolean
) => {
  const session: SessionType = {
    id,
    refresh_token,
    userAgent,
    isVerified,
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

export const getDecodedToken = async (token: string) => {
  var dToken: any;

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decodedToken: any) => {
    if (err) {
      console.log(err.meesage);
      console.log(err);
      throw Error(err.message);
      // res.redirect('/login');
    } else {
      console.log(decodedToken);
      dToken = decodedToken;

      // req.user = decodedToken;
    }
  });

  return dToken;
};

export const deleteSession = async (session_id: string) => {
  redisClient.del(session_id);
};
