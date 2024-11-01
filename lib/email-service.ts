import { transporter, defaultMailOptions } from "./email-config";

export interface EmailTemplate {
  subject: string;
  text?: string;
  html?: string;
}

export interface EmailOptions {
  to: string | string[];
  template: EmailTemplate;
  attachments?: any[];
}

export async function sendEmail({ to, template, attachments }: EmailOptions) {
  try {
    const mailOptions = {
      ...defaultMailOptions,
      to,
      subject: template.subject,
      text: template.text,
      html: template.html,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}
