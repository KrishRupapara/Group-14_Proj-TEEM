"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = require("../config/nodemailer");
const sendEmail = async ({ to, subject, html }) => {
    return nodemailer_1.transporter.sendMail({
        from: "TEEM App <krishrupapara@zohomail.in>",
        to: to,
        subject,
        html,
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map