import { transporter } from "../config/nodemailer";
// import {Resend} from 'resend'
// import * as dotenv from 'dotenv'

// dotenv.config()

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

// const resend = new Resend(process.env.RESEND_KEY)

export const sendEmail = async ({ to, subject, html }: SendEmailProps) => {
  return transporter.sendMail({
    from: '"Krish" <krishrupapara01@gmail.com>',
    to: to,
    subject,
    html,
  });
};
