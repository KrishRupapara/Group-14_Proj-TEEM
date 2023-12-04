"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = exports.getDecodedToken = exports.findSessions = exports.createSession = exports.refreshTokenCookieOptions = exports.accessTokenCookieOptions = void 0;
const redisConnect_1 = require("../config/redisConnect");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.accessTokenCookieOptions = {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 86400 * 1000),
};
exports.refreshTokenCookieOptions = Object.assign(Object.assign({}, exports.accessTokenCookieOptions), { expires: new Date(Date.now() + 30 * 86400 * 1000) });
const createSession = async (id, refresh_token, userAgent, isVerified) => {
    const session = {
        id,
        refresh_token,
        userAgent,
        isVerified,
    };
    redisConnect_1.client.set(id, JSON.stringify(session), "EX", 60 * 60 * 24 * 30);
    return session;
};
exports.createSession = createSession;
const findSessions = async (userId) => {
    const val = redisConnect_1.client.get(userId, (err, reply) => {
        if (err) {
            throw Error(err.message);
        }
    });
    return val;
};
exports.findSessions = findSessions;
const getDecodedToken = async (token) => {
    var dToken;
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.log(err.meesage);
            console.log(err);
            throw Error(err.message);
        }
        else {
            console.log(decodedToken);
            dToken = decodedToken;
        }
    });
    return dToken;
};
exports.getDecodedToken = getDecodedToken;
const deleteSession = async (session_id) => {
    redisConnect_1.client.del(session_id);
};
exports.deleteSession = deleteSession;
//# sourceMappingURL=sessionServies.js.map