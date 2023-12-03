import { Request, Response } from "express";

import { db } from "../config/database";
import { users } from "../model/User";
import { eq } from "drizzle-orm";

import { workspaces, members } from "../model/Workspace";

import { client as redisClient } from "../config/redisConnect";

export const createWorkspacePost = async (req: Request, res: Response) => {
  // res.send("<h1>You can create new workspace</h1>");
  var { title, type, description, Members = [] } = req.body;

  if (!title) {
    return res.status(400).send({ error: "Title is required" });
  }

  const userID = req.user.userID;
  console.log("from the variable", userID);

  const unregisteredMembers: string[] = [];
  const registeredMembers: string[] = [];

  const ProjectManager = await db
    .select()
    .from(users)
    .where(eq(users.userID, userID))
    .limit(1);

  console.log(ProjectManager);

  try {
    const workspace_id = await db
      .insert(workspaces)
      .values({
        title: title,
        type: type,
        description: description,
        projectManager: ProjectManager[0].userID,
      })
      .returning({ workspace_id: workspaces.workspaceID });

    console.log(workspace_id[0].workspace_id);

    const projectmanger_id = await db
      .insert(members)
      .values({
        workspaceID: workspace_id[0].workspace_id,
        memberID: ProjectManager[0].userID,
        role: "Manager",
      })
      .returning({ projectmanger_id: members.memberID });

    // const task_id = await db
    //   .insert(tasks)
    //   .values({
    //     title : "Workspace Completion",
    //     description :"This Task represent the completion of the Workspace",
    //     taskType : "Completion",
    //     deadline : deadline,
    //     status : "To Do",
    //     workspaceID : workspace_id[0].workspace_id
    //   }).returning({task_id : tasks.taskID});

    // console.log(task_id[0].task_id);

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
        registeredMembers.push(member_id);
        await db.insert(members).values({
          workspaceID: workspace_id[0].workspace_id,
          memberID: User[0].userID,
          role: Role,
        });
      }
    }

    /*
    const wsToken = signJWT({ ...workspace_id[0] });

    res.cookie("wsToken", wsToken, wsTokenOptions);
    */

    if (unregisteredMembers.length > 0) {
      res.status(201).send({
        message: "Workspace Created with Unregistered Members",
        UnregisteredMember: unregisteredMembers,
        RegisteredMember: registeredMembers,
      });

      // await sendInvitation(ProjectManager[0].name, title, unregisteredMembers);
    } else {
      res.status(201).send({ message: "Workspace Created successfully" });
    }
    // await sendInvite(ProjectManager[0].name, title, registeredMembers);

    // await sendInvite(ProjectManager[0].name,title,registeredMembers);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error in workspace" });
  }
};

export const getWorkspace = async (req: Request, res: Response) => {
  const wsID: any = req.params.wsID;
  try {
    const cachedData = await redisClient.get(
      `workspace:${wsID}`,
      async (err, data) => {
        if (err) throw err;

        return data;
      }
    );

    if (cachedData) {
      return res.status(200).send(JSON.parse(cachedData));
    }

    const workspace = await db
      .select({
        title: workspaces.title,
        description: workspaces.description,
        projectManager: users.name,
        progress: workspaces.progress,
      })
      .from(workspaces)
      .where(eq(workspaces.workspaceID, wsID))
      .innerJoin(users, eq(workspaces.projectManager, users.userID))
      .limit(1);

    await redisClient.set(
      `workspace:${wsID}`,
      JSON.stringify(workspace),
      "EX",
      60 * 15
    );

    res.json(workspace);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal server error in workspace" });
  }
};

/*
export const settingsWSGet = async(req: Request, res: Response) =>{
    
  const wsID:any = req.params.wsID;
 
  try {
    
   const Workspace = await db
   .select( {
     title: workspaces.title,
     description: workspaces.description,
     type: workspaces.type})
   .from(workspaces)
   .where(eq(workspaces.workspaceID, wsID))
   .limit(1);

 const Members = await db
   .select({
      name: users.name,
      role: members.role,
   })
   .from(members)
   .where(eq(members.workspaceID, wsID))
   .innerJoin(users, eq(members.memberID , users.userID))


   res.status(200).send({
     Title: Workspace[0].title,
     Description: Workspace[0].description,
     Type: Workspace[0].type,

     Members: Members
   })




  } catch (error) {
   console.log(error);
   return res
     .status(500)
     .send({ message: "Internal server error in workspace" });
 }

  };


export const settingsWSPost = async(req: Request, res: Response) =>{
  
 const wsID:any = req.params.wsID;
 const userID:any = req.user.userID;
 const toDo:any = req.params.toDo

 if(toDo === 1)
   deleteWorkspacePost(req, res);
 
   else
   {

 const {title, description, type, Members = []} = req.body;
 const unregisteredMembers: string[] = [];

 try{
 await db
   .update(workspaces)
   .set({
     title: title,
     description:description,
     type: type
   })
   .where(eq(workspaces.workspaceID, wsID));

   await db
     .delete(members)
     .where(eq(members.workspaceID, wsID))
    
    await db
      .insert(members)
      .values({
        workspaceID: wsID,
        memberID: userID,
        role: 4
      })
   
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
       } 
       else {
       
           console.log("Inserting");
           await db.insert(members).values({
             workspaceID: wsID,
             memberID: User[0].userID,
             role: Role,
           });
         
         }
       }
     
     if (unregisteredMembers.length > 0) {
       const projectManager = await db
         .select()
         .from(users)
         .where(eq(users.userID, userID))
         .limit(1);

      

       await sendInvitation(
         projectManager[0].name,
         title,
         unregisteredMembers
       );

       res.status(201).send({
         message: " Settings Saved With Unregistered Members Invited",
         unregisteredMembers,
       });

     } else {
       res.send({ message: "Settings Saved" });
     }
   }
   
 catch(error){
   console.log(error);
   return res
     .status(500)
     .send({ message: "Internal server error in workspace" });
 }
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
  

  const userID:any = req.user.userID;
  const wsID:any = req.params.wsid;

  const workspace = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.workspaceID, wsID))
    .limit(1);

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
              workspaceID: wsID,
              memberID: User[0].userID,
              role: Role,
            });
          } else {
            alreadyPresent.push(member_id);
          }
        }
      

      if (unregisteredMembers.length > 0) {
        const projectManager = await db
          .select()
          .from(users)
          .where(eq(users.userID, userID))
          .limit(1);

        res.status(201).send({
          message: "Unregistered Members Invited",
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
    }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: "Internal server error in workspace" });
    }
  };
  */
