import { sendEmail } from "./sendEmail";

export const sendInvitation = async (name : string,title : string,email: string[]) => {
  const message = `<h1>Hello, dear!</h1>
                    <p>Welcome to TEEM.</p>
                    <h1 style="color: green">You are invited to join a TEEM workspace ${title} created by ${name}. Click the link to register.</h1>`;

  return sendEmail({
    to: email.join(';'),
    subject: "Invitation to TEEM Workspace",
    html: message,
  });
};
