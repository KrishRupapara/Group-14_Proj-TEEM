"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const serverless_1 = require("@neondatabase/serverless");
const neon_http_1 = require("drizzle-orm/neon-http");
serverless_1.neonConfig.fetchConnectionCache = true;
dotenv_1.default.config();
if (!process.env.DATABASE_URI) {
    throw new Error("database uri not found!!");
}
const sql = (0, serverless_1.neon)(process.env.DATABASE_URI);
exports.db = (0, neon_http_1.drizzle)(sql);
//# sourceMappingURL=database.js.map