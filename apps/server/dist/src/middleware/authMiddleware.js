"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const redisConnect_1 = require("../config/redisConnect");
const jwt_1 = require("../utils/jwt");
const sessionServies_1 = require("../services/sessionServies");
dotenv.config();
const requireAuth = (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;
    console.log(accessToken, refreshToken);
    try {
        if (accessToken) {
            const payload = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET);
            req.user = payload.tokenUser;
        }
        else if (refreshToken) {
            const payload = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
            redisConnect_1.client.get(payload.userID, (err, data) => {
                if (err)
                    throw err;
                if (data != refreshToken) {
                    return res.status(401).json({ message: "Please login Again" });
                }
            });
            const access_token = (0, jwt_1.signJWT)(Object.assign(Object.assign({}, payload), { session: payload.userID }));
            res.cookie("accessToken", access_token, sessionServies_1.accessTokenCookieOptions);
            req.user = payload.tokenUser;
            if (!req.user.isVerified) {
                return res.status(401).json({ message: "Please verify your email" });
            }
        }
        else {
            return res.status(401).json({ message: "Please login Again" });
        }
        return next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=authMiddleware.js.map