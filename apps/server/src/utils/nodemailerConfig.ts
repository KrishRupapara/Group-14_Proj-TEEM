import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "talon48@ethereal.email",
    pass: "2eYfS1nQru4cPc7asr",
  },
});
