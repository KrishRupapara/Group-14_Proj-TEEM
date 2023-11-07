import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import { Request, Response, NextFunction } from "express";
import { client as redisClient } from "../config/redisConnect";
import { signJWT } from "../utils/jwt";
import { accessTokenCookieOptions } from "../services/sessionServies";

interface payload {
  tokenUser: {
    userID: string;
    name: string;
    isVerified: boolean;
  };
  iat: number;
  exp: number;
}

dotenv.config();

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  try {
    if (accessToken) {
      const payload = jwt.verify(
        accessToken,
        process.env.JWT_SECRET!
      ) as payload;

      req.user = payload.tokenUser;

      return next();
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET!) as any;

    redisClient.get(payload.userID, (err, data) => {
      if (err) throw err;

      if (data != refreshToken) {
        return res.status(401).json({ message: "Please login Again" });
      }
    });
    const access_token = signJWT({ ...payload, session: payload.userID });

    res.cookie("accessToken", access_token, accessTokenCookieOptions);

    req.user = payload.tokenUser;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
