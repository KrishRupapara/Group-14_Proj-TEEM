import { Request, Response } from "express";

import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { createTokenUserJWT } from '../utils/createTokenUser'
import { attachCookiesToResponse } from '../utils/attachCookiesToResponse'
import bcrypt from "bcrypt";

// const { attachCookiesToResponse, createTokenUserJWT } = require('../utils');
// import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';



export const loginGet = async (req: Request, res: Response) => {
  //     res.sendFile(__dirname + '/public/signup.html');
  res.send("<h1>Login</h1>");

};

export const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Please provide email and password" });
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
    // const isPasswordCorrect = User[0].password === password;

    if (!isPasswordCorrect) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }

    const userJwtToken = createTokenUserJWT(User[0].id);
    
    attachCookiesToResponse(res, userJwtToken );    

    // res.status(StatusCodes.OK).json({ user: tokenUser });

  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }

  res.send({ message: "Login successful" });
};
