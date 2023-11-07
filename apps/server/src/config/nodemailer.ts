import { createTransport } from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

export const transporter = createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASSWORD,
  },
});
