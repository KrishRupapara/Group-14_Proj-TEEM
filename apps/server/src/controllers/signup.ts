import { Request, Response } from "express";

import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";

type users = typeof users.$inferInsert;

export const signupGet = async (req: Request, res: Response) => {
  
//     res.sendFile(__dirname + '/public/signup.html');
        res.send("<h1>Signup</h1>");
};


export const signupPost = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).send({ error: "Username and password required" });
  }

  const verificationToken = randomBytes(32).toString("hex");

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.emailId, email))
      .limit(1);

    if (existingUser.length > 0) {
      console.log("Email already exists");
      return res.status(400).send({ message: "Email already exists" });
    }

    await db.insert(users).values({
      name: username,
      emailId: email,
      password: password,
      verificationToken: verificationToken,
    });

    await sendVerificationEmail(
      username,
      email,
      verificationToken,
      "http://localhost:3500"
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }

  res.send({ message: "Signup successful" });
};



