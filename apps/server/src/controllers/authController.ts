import { Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { eq } from "drizzle-orm";
import { sendOTP } from "../services/sendOTP";
import bcrypt from "bcrypt";

import { randomInt } from "crypto";
import { client as redisClient } from "../config/redisConnect";
import {
  createSession,
  findSessions,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  getDecodedToken,
  deleteSession,
} from "../services/sessionServies";
import { signJWT } from "../utils/jwt";
import { } from "../routes";
import { decode } from "punycode";

export const signUpHandler = async (req: Request, res: Response) => {
  var { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).send({ error: "Username and password required" });
  }

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.emailId, email))
      .limit(1);

    if (existingUser.length > 0) {
      console.log("Email already exists");
      return res.status(400).send({ meesage: "Email already exists" });
    }

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    const otp = randomInt(100000, 1000000).toString();
    const otp_secure = await bcrypt.hash(otp, salt);

    redisClient.set(email, otp_secure, "EX", 60 * 5);

    const id = await db
      .insert(users)
      .values({
        name: username,
        emailId: email,
        password: password,
      })
      .returning({ id: users.userID });

    console.log(id[0].id);

    console.log(otp);

    await sendOTP(username, email, otp); //do not remove this comment as it is for sending the email!!!
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }

  res.send({ message: "Signup successful" });
};

export const verifyUserHandler = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  redisClient.get(email, async (err, otp_secure) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal server error" });
    }
    console.log(otp_secure);
    if (!otp_secure) {
      return res.status(400).send({ message: "OTP expired" });
    }
    const isValid = await bcrypt.compare(otp, otp_secure);
    if (!isValid) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    await db
      .update(users)
      .set({ isVerified: true })
      .where(eq(users.emailId, email));

    return res.send({ message: "User verified" });
  });
};

export const loginHandler = async (req: Request, res: Response) => {
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

    if (User.length < 1) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, User[0].password!);

    if (!isPasswordCorrect) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }

    const session_id = User[0].userID.toString();
    const existing_session = await findSessions(session_id);

    if (existing_session) {
      if (!req.cookies.accessToken) {
        const access_token = signJWT(
          { ...User[0], session: session_id },
          { expiresIn: "24h" }
        );
        res.cookie("accessToken", access_token, accessTokenCookieOptions);
        return res.send({ access_token });
      }

      return res.send({ message: "Already logged in" });
    }

    const access_token = signJWT(
      { ...User[0], session: session_id },
      { expiresIn: "24h" }
    );

    const refresh_token = signJWT(
      { ...User[0], session: session_id },
      { expiresIn: "30d" }
    );

    const session = await createSession(
      session_id,
      req.get("user-agent") || "",
      refresh_token
    );

    res.cookie("refreshToken", refresh_token, refreshTokenCookieOptions);
    res.cookie("accessToken", access_token, accessTokenCookieOptions);

    // res.redirect("/TEEMdashboard");
    return res.send({ access_token, refresh_token });

  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const logoutHandler = async(req: Request, res: Response)=>{
    
  try {
    
    // res.clearCookie("jwtToken"); 

    const token = req.cookies.accessToken;
    const decodedToken = await getDecodedToken(token);
    
   //console.log("In logout");
    console.log(decodedToken.session);
    deleteSession(decodedToken.session);
    
    
    res.cookie('accessToken', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.cookie('refreshToken', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.cookie('wsToken', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(200).send({ message: "Logout successful" });
 


  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
  


}
//   }
// }
export const forgotPasswordPost = async (req : Request, res : Response) => {
  const { email } = req.body;
  if (!email) {
      return res.status(400).send({ error: "Please Provide Email." });;
  }

  console.log(email);

  try {

      const user = await db
        .select()
        .from(users)
        .where(eq(users.emailId, email))
        .limit(1);
  
      if (user.length<1) {
        return res.status(400).send({ error: "Invalid Credentials" });
      }

      console.log(user[0]);     // just for testing 


      if(!user[0].isVerified){        // check for verification
          res.send("User not verified.");
      }

      const otp = randomInt(100000, 1000000).toString();
      const otp_secure = await bcrypt.hash(otp, 10);
      
      sendOTP(user[0].name,email,otp);                    // sending otp
      redisClient.set(email, otp_secure, "EX", 60 * 5);   // storing that inside redisclient

      res.send("OTP sent successfully");
  
}catch (err) {
  console.log(err);
  return res.status(500).send({ message: "Internal server error" });
}



};

export const resetPasswordPost = async (req : Request, res : Response) => {
  let { email, password , otp} = req.body;
  if (!email || !password || !otp) {
    return res.status(400).send({ error: "Invalid/insufficient email or Password" });
  }
  try {

    redisClient.get(email, async (err, otp_secure) => {       // extracting otp from redisclient
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
      }
      if (!otp_secure) {
        return res.status(400).send({ message: "OTP expired" });
      }
      const isValid = await bcrypt.compare(otp, otp_secure);
      if (!isValid) {
        return res.status(400).send({ message: "Invalid OTP" });
      }

      const user = await db
      .select()
      .from(users)
      .where(eq(users.emailId, email))
      .limit(1);

      if (user.length<1) {
        return res.status(400).send({ error: "Invalid Credentials" });
      }

      const isSame = await bcrypt.compare(password,user[0].password!);
      if(isSame){
        res.send("New Password is same as current password.");
      }

      const salt = await bcrypt.genSalt();              // adding salt
      password = await bcrypt.hash(password, salt);
  
      await db              // update the password inside database.
        .update(users)
        .set({ password : password})
        .where(eq(users.emailId, email));
  
      return res.send({ message: "Password Reset Successfully" });
    });
    
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }


};