import { Request, Response } from "express";

import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { createTokenUserJWT } from '../utils/createTokenUser'
import { attachCookiesToResponse } from '../utils/attachCookiesToResponse'
import { randomBytes } from "crypto";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";
import bcrypt from "bcrypt";

type users = typeof users.$inferInsert;

export const resetPasswordGet = async (req: Request, res: Response) => {
    
    //     res.sendFile(__dirname + '/public/resetPassword.html');
    res.send("<h1>Reset Password</h1>");

};


export const resetPassword = async (req : Request, res : Response) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    return res.status(400).send({ error: "Invalid/insufficient email or Password or token" });
  }
  try {

    const User = await db
      .select()
      .from(users)
      .where(eq(users.emailId, email))
      .limit(1);

    if (User.length<1) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, User[0].password);
    if (!isPasswordCorrect) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }

    const userJwtToken = createTokenUserJWT(User[0].id);
    
    attachCookiesToResponse(res, userJwtToken );

  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }

res.send('reset password');
};
