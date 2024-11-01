import { createTransport } from "nodemailer";

export const emailConfig = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const transporter = createTransport(emailConfig);

export const defaultMailOptions = {
  from: process.env.SMTP_FROM_EMAIL || "noreply@yourdomain.com",
};
