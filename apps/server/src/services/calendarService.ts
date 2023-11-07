import { google, Auth } from "googleapis";

const oauth2Client: Auth.OAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!
);

const calendar = google.calendar({
  version: "v3",
  auth: process.env.GOOGLE_CALENDAR_API_KEY!,
});

export { oauth2Client, calendar };
