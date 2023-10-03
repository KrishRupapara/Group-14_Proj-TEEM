import { createTransport } from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

export const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
