"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTask = void 0;
const sendEmail_1 = require("./sendEmail");
const sendTask = async (workspace, task, email) => {
    const message = `<h1>Hello, dear!</h1>
                    <h1 style="color: green">${task} is assigned to you in ${workspace} workspace</h1>`;
    const sub = `[${workspace}] ${task}`;
    return (0, sendEmail_1.sendEmail)({
        to: email.join(';'),
        subject: sub,
        html: message,
    });
};
exports.sendTask = sendTask;
//# sourceMappingURL=sendTask.js.map