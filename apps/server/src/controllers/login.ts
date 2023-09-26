import { Request, Response } from "express";

import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

// import { StatusCodes } from "http-status-codes";
import { randomBytes } from "crypto";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";

export const loginGet = async (req: Request, res: Response) => {
  //     res.sendFile(__dirname + '/public/signup.html');
};

export const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Please provide email and password" });
  }


  const User = await db.select().from(users).where(eq(users.emailId, email)).limit(1);


  if (!User) {
    return res.status(400).send({ error: "Invalid Credentials" });
  }

  const isPasswordCorrect = (User[0].password === password);

  if (!isPasswordCorrect) {
    return res.status(400).send({ error: "Invalid Credentials" });
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });

  res.send({ message: "Signup successful" });
};
