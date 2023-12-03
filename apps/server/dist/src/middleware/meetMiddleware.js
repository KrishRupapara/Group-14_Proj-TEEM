"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeInvitee = exports.meetExist = void 0;
const database_1 = require("../config/database");
const Meet_1 = require("../model/Meet");
const MeetInvitee_1 = require("../model/MeetInvitee");
const drizzle_orm_1 = require("drizzle-orm");
const meetExist = async (req, res, next) => {
    try {
        const meetID = parseInt(req.params.meetID, 10);
        if (isNaN(meetID)) {
            return res.status(400).send("Invalid meetID");
        }
        const wsID = req.workspace.workspaceID;
        const Meet = await database_1.db
            .select({
            meetID: Meet_1.meets.meetID,
            title: Meet_1.meets.title,
            workspaceID: Meet_1.meets.workspaceID,
            organizerID: Meet_1.meets.organizerID,
        })
            .from(Meet_1.meets)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Meet_1.meets.meetID, meetID), (0, drizzle_orm_1.eq)(Meet_1.meets.workspaceID, wsID)))
            .limit(1);
        if (Meet.length > 0) {
            req.meet = Meet[0];
            console.log(req.meet);
            next();
        }
        else {
            res.status(404).send({ Message: "Meet Doesn't Exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ message: "Internal server error in Meet exist Middleware" });
    }
};
exports.meetExist = meetExist;
const authorizeInvitee = async (req, res, next) => {
    try {
        const userID = req.user.userID;
        const wsID = req.workspace.workspaceID;
        const meetID = req.meet.meetID;
        if (req.workspace.projectManager !== userID) {
            const isInvitee = await database_1.db
                .select()
                .from(MeetInvitee_1.invitees)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.workspaceID, wsID), (0, drizzle_orm_1.eq)(MeetInvitee_1.invitees.inviteeID, userID)))
                .limit(1);
            if (isInvitee.length === 0) {
                res.send("You have not been invited to this meet");
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .send({
            message: "Internal server error in authorize invitee middleware",
        });
    }
};
exports.authorizeInvitee = authorizeInvitee;
//# sourceMappingURL=meetMiddleware.js.map