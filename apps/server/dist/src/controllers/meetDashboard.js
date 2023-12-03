"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetDashboard = void 0;
const database_1 = require("../config/database");
const User_1 = require("../model/User");
const drizzle_orm_1 = require("drizzle-orm");
const Meet_1 = require("../model/Meet");
const MeetInvitee_1 = require("../model/MeetInvitee");
const Workspace_1 = require("../model/Workspace");
const redisConnect_1 = require("../config/redisConnect");
const meetDashboard = async (req, res) => {
    try {
        const wsID = req.workspace.workspaceID;
        const meetID = req.meet.meetID;
        const cachedMeet = await redisConnect_1.client.get(`meet:${meetID}`, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "Internal server error" });
            }
            return data;
        });
        if (cachedMeet) {
            console.log("cached");
            return res.status(200).json(JSON.parse(cachedMeet));
        }
        const Meet = await database_1.db
            .select()
            .from(Meet_1.meets)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Meet_1.meets.meetID, meetID), (0, drizzle_orm_1.eq)(Meet_1.meets.workspaceID, wsID)))
            .limit(1);
        console.log(Meet);
        const Invitees = await database_1.db
            .select({
            inviteesID: MeetInvitee_1.invitees.inviteeID,
            inviteesName: User_1.users.name,
            inviteesRole: Workspace_1.members.role,
            inviteesEmailID: User_1.users.emailId,
        })
            .from(MeetInvitee_1.invitees)
            .innerJoin(User_1.users, (0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.inviteeID, User_1.users.userID))
            .innerJoin(Workspace_1.members, (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.inviteeID, Workspace_1.members.memberID), (0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.workspaceID, Workspace_1.members.workspaceID)))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.meetID, meetID), (0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.workspaceID, wsID)));
        const meetDashboard = {
            meet: Meet[0],
            Invitees: Invitees,
        };
        await redisConnect_1.client.set(`meet:${meetID}`, JSON.stringify(meetDashboard), "EX", 60 * 60 * 24);
        res.json(meetDashboard);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Internal server error in meet dashboard" });
    }
};
exports.meetDashboard = meetDashboard;
//# sourceMappingURL=meetDashboard.js.map