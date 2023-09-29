import { Request, Response } from "express";

import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { createTokenUserJWT } from '../utils/createTokenUser'
import { attachCookiesToResponse } from '../utils/attachCookiesToResponse'
import { randomBytes } from "crypto";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";
import bcrypt from "bcrypt";


export const forgotPassword = async (req : Request, res : Response) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ error: "Please Provide Email." });;
    }
  
    try {

        const user = await db
          .select()
          .from(users)
          .where(eq(users.emailId, email))
          .limit(1);
    
        if (user.length<1) {
          return res.status(400).send({ error: "Invalid Credentials" });
        }

    
  }catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }

};