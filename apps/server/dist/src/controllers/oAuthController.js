"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthHanlder = exports.googleoauthHandler = void 0;
const userServices_1 = require("../services/userServices");
const database_1 = require("../config/database");
const User_1 = require("../model/User");
const jwt_1 = require("../utils/jwt");
const sessionServies_1 = require("../services/sessionServies");
const redisConnect_1 = require("../config/redisConnect");
const googleUrl_1 = require("../utils/googleUrl");
const googleoauthHandler = async (req, res) => {
    const code = req.query.code;
    console.log(req.query);
    try {
        const { id_token, access_token, refresh_token } = await (0, userServices_1.getGoogleOAuthToken)({ code });
        console.log({ id_token, access_token });
        const googleUser = await (0, userServices_1.getGoogleUser)({ id_token, access_token });
        console.log({ googleUser });
        if (!googleUser.verified_email) {
            return res
                .status(400)
                .send({ message: "Google account is not verified" });
        }
        const id = await database_1.db
            .insert(User_1.users)
            .values({
            name: googleUser.name,
            emailId: googleUser.email,
            isVerified: true,
            isConnectedToGoogle: true,
            gmailID: googleUser.email,
        })
            .returning({ id: User_1.users.userID });
        const session_id = id[0].id.toString();
        redisConnect_1.client.hset(session_id + "_google_token", {
            access_token,
            refresh_token,
        });
        const accessToken = (0, jwt_1.signJWT)(Object.assign(Object.assign({}, googleUser), { session: session_id }), { expiresIn: "24h" });
        const refreshToken = (0, jwt_1.signJWT)(Object.assign(Object.assign({}, googleUser), { session: session_id }), { expiresIn: "30d" });
        const session = await (0, sessionServies_1.createSession)(session_id, refreshToken, req.get("user-agent") || "", true);
        res.cookie("refreshToken", refreshToken);
        res.cookie("accessToken", accessToken);
        return res.status(200).send({
            message: "Login Successful",
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.googleoauthHandler = googleoauthHandler;
const oauthHanlder = (req, res) => {
    const googleUrl = (0, googleUrl_1.getGoogleUrl)();
    res.redirect(googleUrl);
};
exports.oauthHanlder = oauthHanlder;
//# sourceMappingURL=oAuthController.js.map