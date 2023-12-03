interface SendEmailProps {
    to: string;
    subject: string;
    html: string;
}
export declare const sendEmail: ({ to, subject, html }: SendEmailProps) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export {};
