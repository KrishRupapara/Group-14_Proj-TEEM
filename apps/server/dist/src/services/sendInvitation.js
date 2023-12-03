"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInvitation = void 0;
const sendEmail_1 = require("./sendEmail");
const sendInvitation = async (name, title, email) => {
    const message = `<h1>Hello, dear!</h1>
                    <p>Welcome to TEEM.</p>
                    <h1 style="color: green">You are invited to join a TEEM workspace ${title} created by ${name}. Click the link to register.</h1>`;
    return (0, sendEmail_1.sendEmail)({
        to: email.join(';'),
        subject: "Invitation to TEEM Workspace",
        html: message,
    });
};
exports.sendInvitation = sendInvitation;
//# sourceMappingURL=sendInvitation.js.map