import { sendEmail } from "./sendEmail";

export const sendInvite = async (name : string,title : string,email: string[]) => {
  const message = `<h1>Hello, dear!</h1>
                    <p>Welcome to TEEM.</p>
                    <h1 style="color: green">You are added to a TEEM workspace ${title} created by ${name}.</h1>`;

  return sendEmail({
    to: email.join(';'),
    subject: "Invitation to TEEM Workspace",
    html: message,
  });
};
