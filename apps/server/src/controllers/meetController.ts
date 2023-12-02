import { Request, Response } from "express";

import { db } from "../config/database";
import { meets } from "../model/Meet";
import { users } from "../model/User";
import { eq, and } from "drizzle-orm";
import { invitees } from "../model/MeetInvitee";
import { members } from "../model/Workspace";
import type { event } from "../types/calendarEvent";
import { client as redisClient } from "../config/redisConnect";
import {
  oauth2Client,
  calendar,
  insertEvent,
  deleteCalendarEvent,
} from "../services/calendarService";

import dotenv from "dotenv";
dotenv.config();

export const scheduleMeetHandler = async (req: Request, res: Response) => {
  const {
    title,
    description,
    agenda,
    date,
    startTime,
    endTime,
    venue,
    participants = [],
  } = req.body;

  const { wsID } = req.params;
  console.log(req.user);

  if (!title || !agenda || !date) {
    return res
      .status(400)
      .send({ error: "Please enter required informations" });
  }

  let outsideParticipants: Array<string> = [];

  const meet = await db
    .insert(meets)
    .values({
      title: title,
      agenda: agenda,
      description: description,
      meetDate: date,
      startTime: startTime,
      endTime: endTime,
      venue: venue,
      workspaceID: parseInt(wsID),
      organizerID: req.user.userID,
    })
    .returning({ meet_id: meets.meetID })
    .execute();

  const organizerData = await db
    .select()
    .from(users)
    .where(eq(users.userID, req.user.userID))
    .limit(1);

  if (organizerData.length > 0 && organizerData[0].gmailID) {
    insertEvent({
      userID: organizerData[0].userID,
      summary: title,
      description: agenda,
      startTime: `${date}T${startTime}:00+05:30`,
      endTime: `${date}T${endTime}:00+05:30`,
      organizerEmail: organizerData[0].gmailID,
    });
  }

  if (participants.length > 0) {
    participants.forEach(async (participant: any) => {
      const userData = await db
        .select()
        .from(users)
        .where(eq(users.emailId, participant.emailId))
        .limit(1);

      const participantDetails = await db
        .select()
        .from(members)
        .where(eq(members.memberID, userData[0].userID))
        .limit(1);

      if (participantDetails.length > 0) {
        await db
          .insert(invitees)
          .values({
            meetID: meet[0].meet_id,
            workspaceID: parseInt(wsID),
            inviteeID: participantDetails[0].memberID,
          })
          .execute();

        if (userData.length > 0 && userData[0].gmailID) {
          insertEvent({
            userID: userData[0].userID,
            summary: title,
            description: agenda,
            startTime: `${date}T${startTime}:00+05:30`,
            endTime: `${date}T${endTime}:00+05:30`,
            organizerEmail:
              organizerData[0].gmailID || organizerData[0].emailId,
          });
        }
      } else {
        outsideParticipants.push(participant.emailId);
      }
    });
  }

  if (outsideParticipants.length > 0) {
    res.status(201).send({
      message: "Meet scheduled successfully",
      outsideParticipants: outsideParticipants,
    });
  }

  res.status(201).send({ message: "Meet scheduled successfully" });
};

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
    const meetIDToDelete = parseInt(req.params.meetID);

    //getting workspaceID
    const wsID = req.workspace.workspaceID;

    const meetingDetails = await db
      .select()
      .from(meets)
      .where(eq(meets.meetID, meetIDToDelete))
      .limit(1);

    if (meetingDetails.length === 0) {
      return res.status(400).send({ message: "No such meet exists" });
    }

    if (meetingDetails[0].organizerID !== req.user.userID) {
      return res
        .status(400)
        .send({ message: "You are not authorized to delete this meet" });
    }

    //delete meet from google calendar
    deleteCalendarEvent({
      userID: req.user.userID,
      eventId: "eventID",
    });

    //delete meet from meet table
    await db
      .delete(meets)
      .where(eq(meets.meetID, meetIDToDelete) && eq(meets.workspaceID, wsID));

    //delete meet from meetinvitees table
    await db
      .delete(invitees)
      .where(
        and(eq(invitees.meetID, meetIDToDelete), eq(invitees.workspaceID, wsID))
      );

    res.send({
      message: "meet deleted successfully",
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
