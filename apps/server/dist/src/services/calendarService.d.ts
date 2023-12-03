import { Auth } from "googleapis";
declare const oauth2Client: Auth.OAuth2Client;
declare const calendar: import("googleapis").calendar_v3.Calendar;
declare const insertEvent: ({ userID, summary, description, startTime, endTime, organizerEmail, }: {
    userID: string | number;
    summary: string;
    description: string;
    startTime: string;
    endTime: string;
    organizerEmail: string;
}) => Promise<void>;
declare const getCalendarEvents: ({ userID }: {
    userID: string | number;
}) => Promise<import("googleapis").calendar_v3.Schema$Event[] | undefined>;
declare const deleteCalendarEvent: ({ userID, eventId, }: {
    userID: number;
    eventId: string;
}) => Promise<void>;
export { oauth2Client, calendar, insertEvent, getCalendarEvents, deleteCalendarEvent, };
