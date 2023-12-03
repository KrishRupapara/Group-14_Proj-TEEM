"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitees = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const Workspace_1 = require("./Workspace");
const Meet_1 = require("./Meet");
exports.invitees = (0, pg_core_1.pgTable)("invitees", {
    meetID: (0, pg_core_1.integer)("meetID")
        .references(() => Meet_1.meets.meetID, {
        onDelete: "cascade",
        onUpdate: "cascade",
    })
        .notNull(),
    workspaceID: (0, pg_core_1.integer)("workspaceID")
        .references(() => Meet_1.meets.workspaceID, {
        onDelete: "cascade",
        onUpdate: "cascade",
    })
        .notNull(),
    inviteeID: (0, pg_core_1.integer)("inviteeID")
        .references(() => Workspace_1.members.memberID, {
        onDelete: "cascade",
        onUpdate: "cascade",
    })
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    isAccepted: (0, pg_core_1.boolean)("isAccepted").notNull().default(false),
}, (table) => {
    return {
        pk: (0, pg_core_1.primaryKey)(table.inviteeID, table.meetID, table.workspaceID),
    };
});
//# sourceMappingURL=MeetInvitee.js.map