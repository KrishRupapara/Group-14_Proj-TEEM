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
} from "../services/sessionServies";
import { signJWT } from "../utils/jwt";
import { workspaces } from "@server/model/Workspace";
import { members } from "@server/model/Member";

import jwt_decode from "jwt-decode";

export const createWorkspaceGet = async (req: Request, res: Response) => {
    res.send("<h1>You can create new workspace</h1>");
};

// {
//     "title": "Your Project Title",
//     "members": [
//       {
//         "member_id": "email_id_1",
//         "role": 0
//       },
//       {
//         "member_id": "user_id_2",
//         "role": 1
//       },
//       {
//         "member_id": "user_id_3",
//         "role": 2
//       }
//     ]
//   }
  

export const createWorkspacePost = async (req: Request, res: Response) => {

    // res.send("<h1>You can create new workspace</h1>");
    var { wsTitle, wsDescription, wsMembers } = req.body;

    if (!wsTitle) {
        return res.status(400).send({ error: "Tilte is required" });
    }

    try {
        
        const workspace_id = await db
          .insert(workspaces)
          .values({
            title: wsTitle,
            description: wsDescription,
            projectManager: res.locals.userid,
          })
          .returning({ workspace_id : workspaces.workspaceID });
          
          for (const member of wsMembers) {
            const { member_id, Role } = member;
           await db
          .insert(members)
          .values({
            workspaceID: workspace_id[0].workspace_id,
            memberID: member_id,
            role: Role,
          })
          }
        
        // console.log(id[0].id);
    
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
      }
    
      res.send({ message: "Workspace Created successfully" });
};