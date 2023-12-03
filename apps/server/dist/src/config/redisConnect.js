"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const ioredis_1 = require("ioredis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.client = new ioredis_1.Redis({
    password: process.env.REDIS_PASSWORD,
    port: 12247,
    host: process.env.REDIS_HOST,
});
//# sourceMappingURL=redisConnect.js.map