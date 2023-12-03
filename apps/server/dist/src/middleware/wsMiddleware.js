"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeMember = exports.authorizeManager = exports.wsExist = void 0;
const database_1 = require("../config/database");
const Workspace_1 = require("../model/Workspace");
const drizzle_orm_1 = require("drizzle-orm");
const wsExist = async (req, res, next) => {
    const wsID = parseInt(req.params.wsID, 10);
    if (wsID != req.params.wsID) {
        return res.status(400).send({ Error: "Invalid wsID" });
    }
    try {
        const Workspace = await database_1.db
            .select({
            workspaceID: Workspace_1.workspaces.workspaceID,
            title: Workspace_1.workspaces.title,
            projectManager: Workspace_1.workspaces.projectManager,
        })
            .from(Workspace_1.workspaces)
            .where((0, drizzle_orm_1.eq)(Workspace_1.workspaces.workspaceID, wsID))
            .limit(1);
        if (Workspace.length > 0) {
            req.workspace = Workspace[0];
            next();
        }
        else {
            res.status(404).send({ Message: "Workspace Doesn't Exist" });
        }
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .send({ message: "Internal server error in wsExist middleware" });
    }
};
exports.wsExist = wsExist;
const authorizeManager = async (req, res, next) => {
    const userID = req.user.userID;
    try {
        if (req.workspace.projectManager === userID)
            next();
        else {
            res.status(401).send({ error: "You do not own the workspace" });
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ message: "Internal server error in middleware authManager" });
    }
};
exports.authorizeManager = authorizeManager;
const authorizeMember = async (req, res, next) => {
    const userID = req.user.userID;
    console.log(req.workspace);
    const wsID = req.workspace.workspaceID;
    try {
        if (req.workspace.projectManager !== userID) {
            const isMemeber = await database_1.db
                .select()
                .from(Workspace_1.members)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(Workspace_1.members.workspaceID, wsID), (0, drizzle_orm_1.eq)(Workspace_1.members.memberID, userID)))
                .limit(1);
            if (isMemeber.length === 0) {
                res.status(401).send({
                    Message: "You are not a part of the workspace",
                });
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ message: "Internal server error in middleware authMember" });
    }
};
exports.authorizeMember = authorizeMember;
//# sourceMappingURL=wsMiddleware.js.map