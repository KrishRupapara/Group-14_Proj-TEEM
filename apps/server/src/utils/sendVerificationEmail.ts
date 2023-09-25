import { sendEmail } from "./sendEmail";

export const sendVerificationEmail = async (
  name: string,
  email: string,
  verificationToken: string,
  origin: string
) => {
  const verifyUrl = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please verify your account by clicking the following link :: <a href="${verifyUrl}">Verify Email</a></p>`;

  return sendEmail({
    to: email,
    subject: "Verify Email",
    html: `<h4>Hello ${name}</h4> ${message}`,
  });
};
