"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    userID: (0, pg_core_1.serial)("userID").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 40 }).notNull(),
    emailId: (0, pg_core_1.varchar)("emailId", { length: 60 }).notNull().unique(),
    password: (0, pg_core_1.text)("password"),
    organization: (0, pg_core_1.varchar)("organization", { length: 200 }),
    jobTitle: (0, pg_core_1.varchar)("jobTitle", { length: 200 }),
    country: (0, pg_core_1.varchar)("country", { length: 200 }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").notNull().defaultNow(),
    isVerified: (0, pg_core_1.boolean)("isVerified").notNull().default(false),
    isConnectedToGoogle: (0, pg_core_1.boolean)("isConnectedToGoogle").notNull().default(false),
    gmailID: (0, pg_core_1.varchar)("gmailID", { length: 60 }),
});
//# sourceMappingURL=User.js.map