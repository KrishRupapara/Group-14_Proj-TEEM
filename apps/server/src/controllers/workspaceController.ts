import { Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { and, eq } from "drizzle-orm";
import { getDecodedToken } from "../services/sessionServies";
import { sendInvitation } from "../services/sendInvitation";
import { signJWT } from "../utils/jwt";

import { workspaces } from "../model/Workspace";
import { members } from "../model/Member";
import { wsTokenOptions } from "../services/workspaceServices";

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
  var { title, description, Members = [] } = req.body;

  if (!title) {
    return res.status(400).send({ error: "Tilte is required" });
  }

  const unregisteredMembers: string[] = [];

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

    const wsToken = signJWT({ ...workspace_id[0] });

    res.cookie("wsToken", wsToken, wsTokenOptions);

    if (unregisteredMembers.length > 0) {
      res.status(201).send({
        message: "Workspace Created with out Unregistered Members",
        unregisteredMembers,
      });

      await sendInvitation(ProjectManager[0].name, title, unregisteredMembers);
    } else {
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
    return res
      .status(500)
      .send({ message: "Internal server error in workspace" });
  }
};

export const getWorkspace = async (req: Request, res: Response) => {
 
  const workspaceID : {wsID:any} = {
    wsID: req.params.wsid
};
 
  //console.log(workspaceID);
  
  const wsToken = signJWT(
    { ...workspaceID},
  );

  res.cookie("wsToken", wsToken, wsTokenOptions);
   
  try {
    
  const workspace = await db
    .select({
      title: workspaces.title,
      description: workspaces.description,
      projectManager: users.name})
    .from(workspaces)
    .where(eq(workspaces.workspaceID, workspaceID.wsID))
    .innerJoin(users, eq(workspaces.projectManager , users.userID))
    .limit(1);

  let Members = await db
    .select({
       name: users.name,
       role: members.role,
    })
    .from(members)
    .where(eq(members.workspaceID, workspaceID.wsID))
    .innerJoin(users, eq(members.memberID , users.userID))

    console.log(JSON.stringify(workspace));
    console.log(JSON.stringify(Members));

    /*
    type wsMembers = {
      name: string,
      role: string
    }
    

    const len = Members.length;

    let wsMemArray: wsMembers[] = new Array(len); 

    for(let i = 0; i<len; ++i)
    { 
       wsMemArray[i].name = Members[i].name;
      if(Members[i].role === 0)
       {
        wsMemArray[i].role = 'Teammate';
       }

       if(Members[i].role === 1)
       {
        wsMemArray[i].role = 'Collaborator';
       }

       if(Members[i].role === 2)
       {
        wsMemArray[i].role = 'Client';
       }
      }
     
    const wsDetails = JSON.stringify(workspace).concat(JSON.stringify(wsMemArray));
   */

    const wsDetails = JSON.stringify(workspace).concat(JSON.stringify(Members));
    res.json(wsDetails);
    
    
 
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in workspace" });
  }

};

export const addMembersGet = async (req: Request, res: Response) => {
  res.send("You can add members");
};

export const addMembersPost = async (req: Request, res: Response) => {
  const ws_token = req.cookies.wsToken;
  const decodedWsToken = await getDecodedToken(ws_token);
  const wsID = decodedWsToken.workspace_id;

  const access_token = req.cookies.accessToken;
  const decodedAccessToken = await getDecodedToken(access_token);

  const workspace = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.workspaceID, wsID))
    .limit(1);

  if (workspace[0].projectManager == decodedAccessToken.userID) {
    var { Members } = req.body;
    const unregisteredMembers: string[] = [];
    const alreadyPresent: string[] = [];

    try {
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
          //Checking if member is present
          const wsUser = await db
            .select()
            .from(members)
            .where(
              and(
                eq(members.workspaceID, wsID),
                eq(members.memberID, User[0].userID)
              )
            )
            .limit(1);

          console.log(wsUser);

          if (wsUser.length === 0) {
            // Add registered members who are not in workspace

            console.log("Inserting");
            await db.insert(members).values({
              workspaceID: decodedWsToken.workspace_id,
              memberID: User[0].userID,
              role: Role,
            });
          } else {
            alreadyPresent.push(member_id);
          }
        }
      }

      if (unregisteredMembers.length > 0) {
        const projectManager = await db
          .select()
          .from(users)
          .where(eq(users.userID, decodedAccessToken.userID))
          .limit(1);

        res.status(201).send({
          message: "Unregistered Members Added",
          unregisteredMembers,
        });

        await sendInvitation(
          projectManager[0].name,
          workspace[0].title,
          unregisteredMembers
        );
      } else {
        res.send({ message: "Members Added successfully" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: "Internal server error in workspace" });
    }
  } else {
    res.send("You can't add members!");
  }
};

export const deleteWorkspacePost = async (req: Request, res: Response) => {
  try {
    // checking for requests
    const { workspaceID } = req.body;
    if (!workspaceID) {
      res.send({ message: "Please enter your workspaceID a" });
    }

    const toDelete = workspaceID;

    // Finding the workspace inside database.
    const currentWorkspace = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.workspaceID, toDelete))
      .limit(1);

    // check if the user requesting the deletion is the manager of that workspace.
    if ((res.locals.userid as number) !== currentWorkspace[0].projectManager) {
      res.send({ message: "You are not Project Manager" });
    }

    //  deletion from database.
    await db.delete(workspaces).where(eq(toDelete, workspaces.workspaceID));

    res.send("deleted successfully");

    // still there is a problem in which the entry is not deleted
    //from all the tables where workspace ID is a value
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in workspace" });
  }
};
