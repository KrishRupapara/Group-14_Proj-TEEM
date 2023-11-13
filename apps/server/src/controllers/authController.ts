import { Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { meets } from "../model/Meet";
import { invitees } from "../model/MeetInvitee";
import { members } from "../model/Workspace";
import { tasks } from "../model/Task";
import { assignees } from "../model/TaskAssignee";
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
import { workspaces } from "../model/Workspace";

export const signUpHandler = async (req: Request, res: Response) => {
  var { email, name, password, organization, jobTitle, country } = req.body;

  if (!email || !name || !password) {
    console.log("Username and password required");
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

    // await sendOTP(name, email, otp); //do not remove this comment as it is for sending the email!!!

    const id = await db.insert(users).values({
      name,
      emailId: email,
      password: password,
      organization: organization,
      jobTitle: jobTitle,
      country: country,
    });

    res.status(200).send({ message: "Signup successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const verifyUserHandler = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  console.log(email, otp);

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

    return res.status(200).send({ message: "User verified" });
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

    const { userID, name, isVerified } = User[0];

    const tokenUser = { userID, name, isVerified };

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
        const access_token = signJWT({ tokenUser }, { expiresIn: "24h" });
        res.cookie("accessToken", access_token, accessTokenCookieOptions);
        return res.send({ access_token });
      }

      return res.send({ message: "Already logged in" });
    }

    const access_token = signJWT({ tokenUser }, { expiresIn: "24h" });

    const refresh_token = signJWT(
      { tokenUser, session: session_id },
      { expiresIn: "30d" }
    );

    const session = await createSession(
      session_id,
      req.get("user-agent") || "",
      refresh_token,
      isVerified,
      req.ip
    );

    res.cookie("refreshToken", refresh_token, refreshTokenCookieOptions);
    res.cookie("accessToken", access_token, accessTokenCookieOptions);

    return res.send({ access_token, refresh_token });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    // res.clearCookie("jwtToken");


   const userID: string = res.locals.userid
    deleteSession(userID);
    
    
    res.cookie('accessToken', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.cookie("refreshToken", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.cookie("wsToken", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const forgotPasswordPost = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ error: "Please Provide Email." });
  }

  console.log(email);

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.emailId, email))
      .limit(1);

    if (user.length < 1) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }
    
    if (!user[0].isVerified) {
      // check for verification
      res.send("User not verified.");
    }


      const salt = await bcrypt.genSalt();                
      const otp = randomInt(100000, 1000000).toString();
      const otp_secure = await bcrypt.hash(otp, salt);
      
      sendOTP(user[0].name,email,otp);                    // sending otp
      redisClient.set(email, otp_secure, "EX", 60 * 5);   // storing that inside redisclient

    console.log(user[0]); // just for testing


    

    res.send("OTP sent successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const resetPasswordPost = async (req: Request, res: Response) => {
  let { email, password, otp } = req.body;
  if (!email || !password || !otp) {
    return res
      .status(400)
      .send({ error: "Invalid/insufficient email or Password" });
  }
  try {
    redisClient.get(email, async (err, otp_secure) => {
      // extracting otp from redisclient
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

      if (user.length < 1) {
        return res.status(400).send({ error: "Invalid Credentials" });
      }

      const isSame = await bcrypt.compare(password, user[0].password!);
      if (isSame) {
        res.send("New Password is same as current password.");
      }

      const salt = await bcrypt.genSalt(); // adding salt
      password = await bcrypt.hash(password, salt);

      await db // update the password inside database.
        .update(users)
        .set({ password: password })
        .where(eq(users.emailId, email));

      return res.send({ message: "Password Reset Successfully" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const resendOtp = async (req : Request, res : Response) => {
  let { email} = req.body;
  if (!email ) {
    return res.status(400).send({ error: "Enter email" });
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

      console.log(user[0]);     // just for testing 


      // if(!user[0].isVerified){        // check for verification
      //     res.send("User not verified.");
      // }

      const salt = await bcrypt.genSalt();   
      const otp = randomInt(100000, 1000000).toString();
      const otp_secure = await bcrypt.hash(otp, salt);
      
      sendOTP(user[0].name,email,otp);                    // sending otp
      redisClient.set(email, otp_secure, "EX", 60 * 5);   // storing that inside redisclient

      res.send("OTP re-sent successfully");
    
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }


};


export const deleteUser = async (req : Request, res : Response) => {

  try{

    const userID  : any = req.user.userID;    // get userID from req.user
    
    // find user from database
    const userToDel = await db
        .select()
        .from(users)
        .where(eq(users.userID, userID))
        .limit(1);
  
      if (userToDel.length<1) {
        return res.status(400).send({ error: "Invalid Credentials" });
      }

      // delete user from users table
      await db.delete(users).where(eq(userID, users.userID));

      // delete user from workspace table
      await db.delete(workspaces).where(eq(userID, workspaces.projectManager));

      // find workspaces of user
      const workspacesOfUser = await db
        .select()
        .from(workspaces)
        .where(eq(workspaces.projectManager, userID));

      // delete all the workspaces of user
      for(let i=0;i<workspacesOfUser.length;i++){
        await db.delete(workspaces).where(eq(workspaces.workspaceID, workspacesOfUser[i].workspaceID));
      }

      //delete user from meetings table
      await db.delete(meets).where(eq(userID, meets.organizerID));

      //delete user from assignees table
      await db.delete(assignees).where(eq(userID, assignees.assigneeID));

      //delete user from invites table
      await db.delete(invitees).where(eq(userID, invitees.inviteeID));

      //delete user from members table
      await db.delete(members).where(eq(userID, members.memberID));
      

      // // delete user from redisclient
      // redisClient.del(userToDel[0].emailId);

      // //delete user from sessions table
      // deleteSession(userID);

      res.json({"message" : `User with email : ${userToDel[0].emailId} deleted successfully` ,
                "NOTE" : "User is not deleted from redisclient and sessions table",
                "CHECK FOR" : "User and it's workspace, meetings, tasks, invites, assignees, members are deleted from database"});


  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }


};


export const changepassword = async (req : Request, res : Response) => {

  try{

    const userID  : any = req.user.userID;    // get userID from req.user
    const { oldPassword, newPassword , confirmPassword } = req.body;
    
    // find user from database
    const userToChangePaasword = await db
        .select()
        .from(users)
        .where(eq(users.userID, userID))
        .limit(1);
  
      if (userToChangePaasword.length<1) {
        return res.status(400).send({ error: "Invalid Credentials" });
      }

      const isSame = await bcrypt.compare(oldPassword, userToChangePaasword[0].password!);
      if (isSame) {
        res.send("New Password is same as current password.");
      }


    
      if(newPassword !== confirmPassword){
        res.send("New Password and Confirm Password are not same.");
      }

      const salt = await bcrypt.genSalt(); // adding salt
      const password = await bcrypt.hash(newPassword, salt);

      await db // update the password inside database.
        .update(users)
        .set({ password: password })
        .where(eq(users.userID, userID));

      return res.send({ message: "Password Changed Successfully" });

  }catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }


}








