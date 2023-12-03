"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editMeetDetails = exports.showInvitees = exports.deleteMeet = exports.getCalendarEvents = exports.scheduleMeetHandler = void 0;
const database_1 = require("../config/database");
const Meet_1 = require("../model/Meet");
const User_1 = require("../model/User");
const drizzle_orm_1 = require("drizzle-orm");
const MeetInvitee_1 = require("../model/MeetInvitee");
const Workspace_1 = require("../model/Workspace");
const redisConnect_1 = require("../config/redisConnect");
const calendarService_1 = require("../services/calendarService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const scheduleMeetHandler = async (req, res) => {
    const { summary: title, description, agenda, startDate: date, startTime, endTime, venue, participants = [], } = req.body;
    const { wsID } = req.params;
    console.log(req.user);
    if (!title || !agenda || !date) {
        return res
            .status(400)
            .send({ error: "Please enter required informations" });
    }
    let outsideParticipants = [];
    const meet = await database_1.db
        .insert(Meet_1.meets)
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
        .returning({ meet_id: Meet_1.meets.meetID })
        .execute();
    const organizerData = await database_1.db
        .select()
        .from(User_1.users)
        .where((0, drizzle_orm_1.eq)(User_1.users.userID, req.user.userID))
        .limit(1);
    if (participants.length > 0) {
        participants.forEach(async (participant) => {
            const userData = await database_1.db
                .select()
                .from(User_1.users)
                .where((0, drizzle_orm_1.eq)(User_1.users.emailId, participant))
                .limit(1);
            const participantDetails = await database_1.db
                .select()
                .from(Workspace_1.members)
                .where((0, drizzle_orm_1.eq)(Workspace_1.members.memberID, userData[0].userID))
                .limit(1);
            if (participantDetails.length > 0) {
                await database_1.db
                    .insert(MeetInvitee_1.invitees)
                    .values({
                    meetID: meet[0].meet_id,
                    workspaceID: parseInt(wsID),
                    inviteeID: participantDetails[0].memberID,
                })
                    .execute();
                if (userData.length > 0 && userData[0].gmailID) {
                    (0, calendarService_1.insertEvent)({
                        userID: userData[0].userID,
                        summary: title,
                        description: agenda,
                        startTime: `${date}T${startTime}:00+05:30`,
                        endTime: `${date}T${endTime}:00+05:30`,
                        organizerEmail: organizerData[0].gmailID || organizerData[0].emailId,
                    });
                }
            }
            else {
                outsideParticipants.push(participant);
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
exports.scheduleMeetHandler = scheduleMeetHandler;
const getCalendarEvents = async (req, res) => {
    try {
        const { userID } = req.query;
        console.log(userID);
        const token = await redisConnect_1.client.hgetall(userID + "_google_token", (err, token) => {
            if (err) {
                console.log(err);
                return;
            }
            return token;
        });
        calendarService_1.oauth2Client.setCredentials(token);
        const response = await calendarService_1.calendar.events.list({
            auth: calendarService_1.oauth2Client,
            calendarId: "primary",
            timeMin: new Date("2023-11-01").toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: "startTime",
        });
        const events = response.data.items;
        res.json(events);
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
};
exports.getCalendarEvents = getCalendarEvents;
const deleteMeet = async (req, res) => {
    try {
        const meetIDToDelete = parseInt(req.params.meetID);
        const wsID = req.workspace.workspaceID;
        const meetingDetails = await database_1.db
            .select()
            .from(Meet_1.meets)
            .where((0, drizzle_orm_1.eq)(Meet_1.meets.meetID, meetIDToDelete))
            .limit(1);
        if (meetingDetails.length === 0) {
            return res.status(400).send({ message: "No such meet exists" });
        }
        if (meetingDetails[0].organizerID !== req.user.userID) {
            return res
                .status(400)
                .send({ message: "You are not authorized to delete this meet" });
        }
        (0, calendarService_1.deleteCalendarEvent)({
            userID: req.user.userID,
            eventId: "eventID",
        });
        await database_1.db
            .delete(Meet_1.meets)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Meet_1.meets.meetID, meetIDToDelete), (0, drizzle_orm_1.eq)(Meet_1.meets.workspaceID, wsID)));
        await database_1.db
            .delete(MeetInvitee_1.invitees)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.meetID, meetIDToDelete), (0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.workspaceID, wsID)));
        res.send({
            message: "meet deleted successfully",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error in Meet" });
    }
};
exports.deleteMeet = deleteMeet;
const showInvitees = async (req, res) => {
    const wsID = req.params.wsID;
    const meetID = req.params.meetID;
    try {
        const Invitees = await database_1.db
            .select({
            name: User_1.users.name,
        })
            .from(MeetInvitee_1.invitees)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.workspaceID, wsID), (0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.meetID, meetID)))
            .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(User_1.users.userID, MeetInvitee_1.invitees.inviteeID));
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error in task" });
    }
};
exports.showInvitees = showInvitees;
const editMeetDetails = async (req, res) => {
    const wsID = req.workspace.workspaceID;
    const meetID = req.params.meetID;
    var { title, agenda, description, date, startTime, endTime, venue } = req.body;
    try {
        if (!title ||
            !agenda ||
            !description ||
            !date ||
            !startTime ||
            !endTime ||
            !venue) {
            return res.status(400).json({ error: "Fields are insufficient" });
        }
        else if (title === null || title === "")
            return res.status(400).send({ error: "Title can not be empty" });
        else {
            const existingMeet = await database_1.db
                .select()
                .from(Meet_1.meets)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Meet_1.meets.meetID, meetID), (0, drizzle_orm_1.eq)(Meet_1.meets.workspaceID, wsID)))
                .limit(1);
            if (existingMeet.length === 0) {
                return res.status(400).send({ message: "No such meet exists" });
            }
            if (existingMeet[0].organizerID !== req.user.userID) {
                return res
                    .status(400)
                    .send({ message: "You are not authorized to edit this meet" });
            }
            const updatedFields = {};
            if (title !== existingMeet[0].title)
                updatedFields.title = title;
            if (description !== existingMeet[0].description)
                updatedFields.description = description;
            if (date !== existingMeet[0].meetDate)
                updatedFields.meetDate = date;
            if (agenda !== existingMeet[0].agenda)
                updatedFields.agenda = agenda;
            if (startTime !== existingMeet[0].startTime)
                updatedFields.startTime = startTime;
            if (endTime !== existingMeet[0].endTime)
                updatedFields.endTime = endTime;
            if (venue !== existingMeet[0].venue)
                updatedFields.venue = venue;
            if (Object.keys(updatedFields).length > 0) {
                const updatedMeet = await database_1.db
                    .update(Meet_1.meets)
                    .set(updatedFields)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Meet_1.meets.meetID, meetID), (0, drizzle_orm_1.eq)(Meet_1.meets.workspaceID, wsID)));
                return res.status(200).send({ message: "Meet Edited Successfully" });
            }
            return res.status(200).send({ message: "Nothing to update" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error in task" });
    }
};
exports.editMeetDetails = editMeetDetails;
//# sourceMappingURL=meetController.js.map