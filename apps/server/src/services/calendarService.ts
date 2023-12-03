import { google, Auth } from "googleapis";
import { client as redisClient } from "../config/redisConnect";

const oauth2Client: Auth.OAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!
);

const calendar = google.calendar({
  version: "v3",
  auth: process.env.GOOGLE_CALENDAR_API_KEY!,
});

const setOAuthToken = async ({ userID }: { userID: string | number }) => {
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

  return oauth2Client;
};

const insertEvent = async ({
  userID,
  summary,
  description,
  startTime,
  endTime,
  organizerEmail,
}: {
  userID: string | number;
  summary: string;
  description: string;
  startTime: string;
  endTime: string;
  organizerEmail: string;
}) => {
  const authClient = await setOAuthToken({ userID: userID });

  const response = await calendar.events.insert({
    auth: authClient,
    calendarId: "primary",
    // eventId: 'primary',
    requestBody: {
      summary: summary,
      description: description,
      start: {
        dateTime: startTime,
        timeZone: "India/Kolkata",
      },
      end: {
        dateTime: endTime,
        timeZone: "India/Kolkata",
      },
      organizer: {
        email: organizerEmail,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    },
  });

  console.log("Event created", userID);
  console.log(response.data);
};

const getCalendarEvents = async ({ userID }: { userID: string | number }) => {
  const authClient = await setOAuthToken({ userID: userID });
  const date = new Date();
  const response = await calendar.events.list({
    auth: authClient,
    calendarId: "primary",
    timeMin: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });

  console.log(response.data.items);
  return response.data.items;
};

const deleteCalendarEvent = async ({
  userID,
  eventId,
}: {
  userID: number;
  eventId: string;
}) => {
  const authClient = await setOAuthToken({ userID: userID });
  const response = await calendar.events.delete({
    auth: authClient,
    calendarId: "primary",
    eventId: eventId,
  });

  console.log("Event deleted", userID);
  console.log(response.data);
};

export {
  oauth2Client,
  calendar,
  insertEvent,
  getCalendarEvents,
  deleteCalendarEvent,
};
