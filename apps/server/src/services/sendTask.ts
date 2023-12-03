
import { sendEmail } from "./sendEmail";

export const sendTask = async (workspace : string,task : string,email: string[]) => {
  const message = `<h1>Hello, dear!</h1>
                    <h1 style="color: green">${task} is assigned to you in ${workspace} workspace</h1>`;

  const sub = `[${workspace}] ${task}`;                
  return sendEmail({
    to: email.join(';'),
    subject: sub,
    html: message,
  });
};
