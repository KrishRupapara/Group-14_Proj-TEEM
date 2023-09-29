
import { sendEmail } from "./sendEmail";

export const sendResetPasswordEmail = async (
  name: string,
  email: string,
  verificationToken: string,
  origin: string
) => {
  const resetURL = `${origin}/user/reset-password?token=${verificationToken}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Reset Password</a></p>`;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello ${name}</h4> ${message}`,
  });
};

module.exports = sendResetPasswordEmail;