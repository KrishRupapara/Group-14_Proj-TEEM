"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleUser = exports.getGoogleOAuthToken = void 0;
const querystring_1 = __importDefault(require("querystring"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getGoogleOAuthToken = async ({ code }) => {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
    };
    try {
        const res = await axios_1.default.post(url, querystring_1.default.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                scope: "https://www.googleapis.com/auth/calendar.events",
            },
        });
        console.log("result from google is", res.data);
        return res.data;
    }
    catch (err) {
        console.error(err.respones.data.error);
        throw new Error("Google OAuth Token Error");
    }
};
exports.getGoogleOAuthToken = getGoogleOAuthToken;
const getGoogleUser = async ({ id_token, access_token, }) => {
    try {
        const res = await axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });
        return res.data;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.getGoogleUser = getGoogleUser;
//# sourceMappingURL=userServices.js.map