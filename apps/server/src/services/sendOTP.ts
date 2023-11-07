import { emailBody } from "../view/email";
import { sendEmail } from "./sendEmail";

export const sendOTP = async (name: string, email: string, otp: string) => {
  try {
    await sendEmail({
      to: email,
      subject: "Verify Email",
      html: emailBody({ username: name, otp }),
    });
  } catch (err) {
    console.log(err);
  }
};
