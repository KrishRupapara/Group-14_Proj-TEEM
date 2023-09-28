import { Request, Response } from "express";

import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";
import bcrypt from "bcrypt";

type users = typeof users.$inferInsert;

export const resetPasswordGet = async (req: Request, res: Response) => {
    
    //     res.sendFile(__dirname + '/public/resetPassword.html');
    res.send("<h1>Reset Password</h1>");

};


export const resetPasswordPost = async (req: Request, res: Response) => {
  var { email} = req.body;

  if (!email) {
    return res.status(400).send({ error: "emailId required" });
  }


  

  res.send({ message: "Password reset Successful." });
};



