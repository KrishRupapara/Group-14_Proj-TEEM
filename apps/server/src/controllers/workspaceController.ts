import { Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { eq } from "drizzle-orm";
import { sendInvitation } from "../services/sendInvitation";

import { workspaces } from "../model/Workspace";
import { members } from "../model/Member";

export const createWorkspaceGet = async (req: Request, res: Response) => {
  res.send("<h1>You can create new workspace</h1>");
};


/* Request Body Preview */
// {
//     "title": "Your Project Title",
//     "description": "Your Project Description",
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
  var { title, description, Members } = req.body;

  if (!title) {
    return res.status(400).send({ error: "Tilte is required" });
  }

  const unregisteredMembers :string[] = [];

  const ProjectManager = await db
    .select()
    .from(users)
    .where(eq(users.userID, res.locals.userid))
    .limit(1);

  try {
    const workspace_id = await db
      .insert(workspaces)
      .values({
        title: title,
        description: description,
        projectManager: ProjectManager[0].userID,
      })
      .returning({ workspace_id: workspaces.workspaceID });

    console.log(workspace_id[0].workspace_id);
    

    for (const Member of Members) {
      const { member_id, Role } = Member;

      const User = await db
        .select()
        .from(users)
        .where(eq(users.emailId, member_id))
        .limit(1);

      if (User.length === 0) {
        // Handle unregistered team members
        unregisteredMembers.push(member_id);
      } else {
        // Add registered members to the workspace
        await db.insert(members).values({
          workspaceID: workspace_id[0].workspace_id,
          memberID: User[0].userID,
          role: Role,
        });
      }
    }

    if (unregisteredMembers.length > 0) {
      res
        .status(201)
        .send({
          message: "Workspace Created with Unregistered Members",
          unregisteredMembers,
        });
     
      await sendInvitation(ProjectManager[0].name, title, unregisteredMembers);
    }else{
        res.send({ message: "Workspace Created successfully" });
    }

    /*if (req.body.userChoice == "sendInvitation") {

      await sendInvitation(ProjectManager[0].name, title, unregisteredMembers);
      res.status(200).send({ message: "Invitations sent successfully" });

    } else if (req.body.userChoice == "cancel") {
      res.status(200).send({ message: "Operation canceled" });
    }*/

    // console.log(id[0].id);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error in workspace" });
  }

  
};
