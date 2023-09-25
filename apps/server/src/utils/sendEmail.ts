// import { createTestAccount, createTransport } from "nodemailer";
import { transporter } from "./nodemailerConfig";

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailProps) => {
  // let testAccount = await createTestAccount();

  return transporter.sendMail({
    from: '"Krish" <krishrupapara01@gmail.com>',
    to: to,
    subject,
    html,
  });
};
