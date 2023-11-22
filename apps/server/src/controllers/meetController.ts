import { Request, Response } from "express";

import { db } from "../config/database";
import { meets } from "../model/Meet";
import { users } from "../model/User";
import { eq, and } from "drizzle-orm";
import { invitees } from "../model/MeetInvitee";
import { members } from "../model/Workspace";
import type { event } from "../types/calendarEvent";
import { client as redisClient } from "../config/redisConnect";
import { oauth2Client, calendar } from "../services/calendarService";

import dotenv from "dotenv";
dotenv.config();

export const scheduleMeetHandler = async (req: Request, res: Response) => {
  const {
    title,
    description,
    agenda,
    date,
    time,
    duration,
    participants = [],
  } = req.body;

  const { workspaceID } = req.params;

  if (!req.user.userID) {
    return res.send({ message: "Please login again!!" });
  }

  if (!title || !agenda || !date || !time || !duration) {
    return res
      .status(400)
      .send({ error: "Please enter required informations" });
  }

  console.log("User id is ", req.user.userID);
  const meetTime = new Date(date + " " + time);

  const meet = await db
    .insert(meets)
    .values({
      title: title,
      agenda: agenda,
      description: description,
      meetTime: new Date(meetTime) as any,
      duration: duration,
      workspaceID: parseInt(workspaceID),
      organizerID: req.user.userID,
      createdAt: new Date(),
    })
    .returning({ meet_id: meets.meetID })
    .execute();

  if (participants.length > 0) {
    participants.forEach(async (participant: any) => {
      const participantDetails = await db
        .select()
        .from(members)
        .where(eq(users.emailId, participant.emailId))
        .limit(1);

      if (participantDetails.length > 0) {
        await db
          .insert(invitees)
          .values({
            meetID: meet[0].meet_id,
            workspaceID: parseInt(workspaceID),
            inviteeID: participantDetails[0].memberID,
          })
          .execute();
      }
    });
  }

  res.status(201).send({ message: "Meet scheduled successfully" });
};

// export const getCalendarEvents = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.query;
//     const token = await redisClient.hgetall(
//       userId + "_google_token",
//       (err, token) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         return token;
//       }
//     );

//     oauth2Client.setCredentials(token);

//     const response = await calendar.events.insert({
//       auth: oauth2Client,
//       calendarId: "primary",
//       requestBody: event,
//     });

//     res.json({
//       message: "Meet scheduled successfully",
//       link: response.data.htmlLink,
//     });
//   } catch (err) {
//     console.log(err);
//     res.json(err);
//   }
// };

export const getCalendarEvents = async (req: Request, res: Response) => {
  try {
    const { userID } = req.query;
    console.log(userID);
    const token = await redisClient.hgetall(
      userID + "_google_token",
      (err, token) => {
        if (err) {
          console.log(err);
          return;
        }
        return token;
      }
    );

    // console.log(token);

    oauth2Client.setCredentials(token);

    const response = await calendar.events.list({
      auth: oauth2Client,
      calendarId: "primary",
      timeMin: new Date("2023-11-01").toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items;
    // console.log(events);

    res.json(events);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// delete meet controller
export const deleteMeet = async (req: Request, res: Response) => {
  try {
    // getting meetID from params
    const meetIDToDelete: any = req.params.meetID;
    //getting workspaceID from params
    const wsID: any = req.params.wsID;

    //delete meet from meet table
    await db
      .delete(meets)
      .where(eq(meets.meetID, meetIDToDelete) && eq(meets.workspaceID, wsID));

    //delete meet from meetinvitees table
    await db
      .delete(invitees)
      .where(
        eq(invitees.meetID, meetIDToDelete) && eq(invitees.workspaceID, wsID)
      );

    res.json({
      message: "meet deleted successfully",
      EXPECTED: "tMeet must be deleted from meetinvitees table also",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error in Meet" });
  }
};

export const showInvitees = async (req: Request, res: Response) => {
  const wsID: any = req.params.wsID;
  const meetID: any = req.params.meetID;

  try {
    const Invitees = await db
      .select({
        name: users.name,
      })
      .from(invitees)
      .where(and(eq(invitees.workspaceID, wsID), eq(invitees.meetID, meetID)))
      .innerJoin(users, eq(users.userID, invitees.inviteeID));
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error in task" });
  }
};
