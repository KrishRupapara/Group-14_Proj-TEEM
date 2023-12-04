"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.changePassword = exports.resendOtp = exports.resetPasswordPost = exports.forgotPasswordPost = exports.logoutHandler = exports.loginHandler = exports.verifyUserHandler = exports.signUpHandler = void 0;
const database_1 = require("../config/database");
const User_1 = require("../model/User");
const drizzle_orm_1 = require("drizzle-orm");
const sendOTP_1 = require("../services/sendOTP");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = require("crypto");
const redisConnect_1 = require("../config/redisConnect");
const sessionServies_1 = require("../services/sessionServies");
const jwt_1 = require("../utils/jwt");
const signUpHandler = async (req, res) => {
    var { email, name, password, organization, jobTitle, country } = req.body;
    if (!email || !name || !password) {
        console.log("Username and password required");
        return res.status(400).send({ error: "Username and password required" });
    }
    try {
        const existingUser = await database_1.db
            .select()
            .from(User_1.users)
            .where((0, drizzle_orm_1.eq)(User_1.users.emailId, email))
            .limit(1);
        if (existingUser.length > 0) {
            console.log("Email already exists");
            return res.status(400).send({ message: "Email already exists" });
        }
        const salt = await bcrypt_1.default.genSalt();
        password = await bcrypt_1.default.hash(password, salt);
        const otp = (0, crypto_1.randomInt)(100000, 1000000).toString();
        const otp_secure = await bcrypt_1.default.hash(otp, salt);
        redisConnect_1.client.set(email, otp_secure, "EX", 60 * 5);
        await (0, sendOTP_1.sendOTP)(name, email, otp);
        const id = await database_1.db.insert(User_1.users).values({
            name,
            emailId: email,
            password: password,
            organization: organization,
            jobTitle: jobTitle,
            country: country,
        });
        res.status(200).send({ message: "Signup successful" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.signUpHandler = signUpHandler;
const verifyUserHandler = async (req, res) => {
    const { email, otp } = req.body;
    console.log(email, otp);
    redisConnect_1.client.get(email, async (err, otp_secure) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: "Internal server error" });
        }
        if (!otp_secure) {
            return res.status(400).send({ message: "OTP expired" });
        }
        const isValid = await bcrypt_1.default.compare(otp, otp_secure);
        if (!isValid) {
            return res.status(400).send({ message: "Invalid OTP" });
        }
        const User = await database_1.db
            .update(User_1.users)
            .set({ isVerified: true })
            .where((0, drizzle_orm_1.eq)(User_1.users.emailId, email))
            .returning();
        const userID = User[0].userID;
        const name = User[0].name;
        const isVerified = true;
        const tokenUser = { userID, name, isVerified };
        const session_id = User[0].userID.toString();
        const access_token = (0, jwt_1.signJWT)({ tokenUser }, { expiresIn: "24h" });
        const refresh_token = (0, jwt_1.signJWT)({ tokenUser, session: session_id }, { expiresIn: "30d" });
        const session = await (0, sessionServies_1.createSession)(session_id, req.get("user-agent") || "", refresh_token, isVerified);
        console.log(access_token, refresh_token);
        res.cookie("refreshToken", refresh_token, sessionServies_1.refreshTokenCookieOptions);
        res.cookie("accessToken", access_token, sessionServies_1.accessTokenCookieOptions);
        return res.status(200).send({ message: "User verified" });
    });
};
exports.verifyUserHandler = verifyUserHandler;
const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Please provide email and password" });
    }
    try {
        const User = await database_1.db
            .select()
            .from(User_1.users)
            .where((0, drizzle_orm_1.eq)(User_1.users.emailId, email))
            .limit(1);
        if (User.length < 1) {
            return res.status(400).send({ error: "Invalid Credentials" });
            return res.status(400).send({ error: "Invalid Credentials" });
        }
        const { userID, name, isVerified } = User[0];
        const tokenUser = { userID, name, isVerified };
        const isPasswordCorrect = await bcrypt_1.default.compare(password, User[0].password);
        if (!isPasswordCorrect) {
            return res.status(400).send({ error: "Invalid Credentials" });
        }
        const session_id = User[0].userID.toString();
        const access_token = (0, jwt_1.signJWT)({ tokenUser }, { expiresIn: "24h" });
        const refresh_token = (0, jwt_1.signJWT)({ tokenUser, session: session_id }, { expiresIn: "30d" });
        const session = await (0, sessionServies_1.createSession)(session_id, req.get("user-agent") || "", refresh_token, isVerified);
        console.log(access_token, refresh_token);
        res.cookie("refreshToken", refresh_token, sessionServies_1.refreshTokenCookieOptions);
        res.cookie("accessToken", access_token, sessionServies_1.accessTokenCookieOptions);
        return res.send({
            message: "Login successful",
            access_token,
            refresh_token,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.loginHandler = loginHandler;
const logoutHandler = async (req, res) => {
    try {
        const userID = res.locals.userid;
        (0, sessionServies_1.deleteSession)(userID);
        res.cookie("accessToken", "logout", {
            httpOnly: true,
            expires: new Date(Date.now()),
        });
        res.cookie("refreshToken", "logout", {
            httpOnly: true,
            expires: new Date(Date.now()),
        });
        res.cookie("wsToken", "logout", {
            httpOnly: true,
            expires: new Date(Date.now()),
        });
        res.status(200).send({ message: "Logout successful" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.logoutHandler = logoutHandler;
const forgotPasswordPost = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ error: "Please Provide Email." });
    }
    console.log(email);
    try {
        const user = await database_1.db
            .select()
            .from(User_1.users)
            .where((0, drizzle_orm_1.eq)(User_1.users.emailId, email))
            .limit(1);
        if (user.length < 1) {
            return res.status(400).send({ error: "Invalid Credentials" });
        }
        if (!user[0].isVerified) {
            res.send("User not verified.");
        }
        const salt = await bcrypt_1.default.genSalt();
        const otp = (0, crypto_1.randomInt)(100000, 1000000).toString();
        const otp_secure = await bcrypt_1.default.hash(otp, salt);
        await (0, sendOTP_1.sendOTP)(user[0].name, email, otp);
        redisConnect_1.client.set(email, otp_secure, "EX", 60 * 5);
        console.log(user[0]);
        res.status(200).send({ message: "OTP sent successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.forgotPasswordPost = forgotPasswordPost;
const resetPasswordPost = async (req, res) => {
    let { email, password, otp } = req.body;
    if (!email || !password || !otp) {
        return res
            .status(400)
            .send({ error: "Invalid/insufficient email or Password or OTP" });
    }
    try {
        redisConnect_1.client.get(email, async (err, otp_secure) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "Internal server error" });
            }
            if (!otp_secure) {
                return res.status(400).send({ message: "OTP expired" });
            }
            const isValid = await bcrypt_1.default.compare(otp, otp_secure);
            if (!isValid) {
                return res.status(400).send({ message: "Invalid OTP" });
            }
            const user = await database_1.db
                .select()
                .from(User_1.users)
                .where((0, drizzle_orm_1.eq)(User_1.users.emailId, email))
                .limit(1);
            if (user.length < 1) {
                return res.status(400).send({ error: "Invalid Credentials" });
            }
            const isSame = await bcrypt_1.default.compare(password, user[0].password);
            if (isSame) {
                res
                    .status(400)
                    .send({ error: "New Password is same as current password." });
            }
            const salt = await bcrypt_1.default.genSalt();
            password = await bcrypt_1.default.hash(password, salt);
            await database_1.db
                .update(User_1.users)
                .set({ password: password })
                .where((0, drizzle_orm_1.eq)(User_1.users.emailId, email));
            return res.status(200).send({ message: "Password Reset Successfully" });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.resetPasswordPost = resetPasswordPost;
const resendOtp = async (req, res) => {
    let { email } = req.body;
    if (!email) {
        return res.status(400).send({ error: "Enter email" });
    }
    try {
        const user = await database_1.db
            .select()
            .from(User_1.users)
            .where((0, drizzle_orm_1.eq)(User_1.users.emailId, email))
            .limit(1);
        if (user.length < 1) {
            return res.status(400).send({ error: "Invalid Credentials" });
        }
        console.log(user[0]);
        const salt = await bcrypt_1.default.genSalt();
        const otp = (0, crypto_1.randomInt)(100000, 1000000).toString();
        const otp_secure = await bcrypt_1.default.hash(otp, salt);
        (0, sendOTP_1.sendOTP)(user[0].name, email, otp);
        redisConnect_1.client.set(email, otp_secure, "EX", 60 * 5);
        res.send("OTP re-sent successfully");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.resendOtp = resendOtp;
const changePassword = async (req, res) => {
    try {
        const userID = req.user.userID;
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const userToChangePaasword = await database_1.db
            .select()
            .from(User_1.users)
            .where((0, drizzle_orm_1.eq)(User_1.users.userID, userID))
            .limit(1);
        if (userToChangePaasword.length < 1) {
            return res.status(400).send({ error: "Invalid Credentials" });
        }
        const isSame = await bcrypt_1.default.compare(newPassword, userToChangePaasword[0].password);
        if (isSame) {
            res.send("New Password is same as current password.");
        }
        if (newPassword !== confirmPassword) {
            res.send("New Password and Confirm Password are not same.");
        }
        const salt = await bcrypt_1.default.genSalt();
        const password = await bcrypt_1.default.hash(newPassword, salt);
        await database_1.db
            .update(User_1.users)
            .set({ password: password })
            .where((0, drizzle_orm_1.eq)(User_1.users.userID, userID));
        return res.send({ message: "Password Changed Successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.changePassword = changePassword;
const checkAuth = async (req, res) => {
    return res.status(200).send({ message: "success" });
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=authController.js.map