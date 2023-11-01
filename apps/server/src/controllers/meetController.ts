import { Request, Response } from "express";
import { db } from "../config/database";
import { meets } from "../model/Meet";

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
  const { userID, workspaceID } = req.params;

  console.log(req.params);

  if (!title || !agenda || !date || !time || !duration) {
    return res
      .status(400)
      .send({ error: "Please enter required informations" });
  }

  const meetTime = new Date(date + " " + time);

  // console.log(userId);

  const meet = await db
    .insert(meets)
    .values({
      title: title,
      agenda: agenda,
      description: description,
      meetTime: meetTime,
      duration: duration,
      workspaceID: parseInt(workspaceID),
      organizerID: parseInt(userID),
      createdAt: new Date(),
    })
    .execute();

  res.status(201).send({ message: "Meet scheduled successfully" });
};
