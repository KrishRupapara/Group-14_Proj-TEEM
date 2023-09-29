import { Request, Response } from "express";

import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
// import { createTokenUserJWT } from '../utils/createTokenUser'
// import { attachCookiesToResponse } from '../utils/attachCookiesToResponse'
import { randomBytes } from "crypto";
// import { sendVerificationEmail } from "../utils/sendVerificationEmail";
import bcrypt from "bcrypt";
// import { sendResetPasswordEmail } from "../utils/sendResetPasswordEmail";

type users = typeof users.$inferInsert;

export const resetPasswordGet = async (req: Request, res: Response) => {
    
    //     res.sendFile(__dirname + '/public/resetPassword.html');
    res.send("<h1>Reset Password</h1>");

};


export const resetPasswordPost = async (req : Request, res : Response) => {
  let { email, password} = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Invalid/insufficient email or Password" });
  }
  try {

    const verificationToken = randomBytes(32).toString("hex");

    let User = await db
      .select()
      .from(users)
      .where(eq(users.emailId, email))
      .limit(1);

    if (User.length<1) {
      return res.status(400).send({ error: "Invalid Credentials" });
      
    }
    // const oldUser = User;
    // console.log(User);
    

    const salt = await bcrypt.genSalt();
    password=await bcrypt.hash(password, salt);



    await db
    .update(users)
    .set({password : password})
    .where(eq(users.emailId , email));
    
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }


  res.send("Password has been reset successfully");

};
