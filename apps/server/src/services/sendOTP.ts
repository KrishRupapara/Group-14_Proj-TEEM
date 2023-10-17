import { emailBody } from "../view/email";
import { sendEmail } from "./sendEmail";

export const sendOTP = async (name: string, email: string, otp: string) => {
  // const message = `<h1>Hello, ${name}!</h1>
  //                   <p>Welcome to TEEM.</p>
  //                   <h1 style="color: green">This is your otp :: ${otp}</h1>`;

  return sendEmail({
    to: email,
    subject: "Verify Email",
    html: emailBody({ username: name, otp }),
  });
};
