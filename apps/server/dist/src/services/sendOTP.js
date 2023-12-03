"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const email_1 = require("../view/email");
const sendEmail_1 = require("./sendEmail");
const sendOTP = async (name, email, otp) => {
    try {
        await (0, sendEmail_1.sendEmail)({
            to: email,
            subject: "Verify Email",
            html: (0, email_1.emailBody)({ username: name, otp }),
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.sendOTP = sendOTP;
//# sourceMappingURL=sendOTP.js.map