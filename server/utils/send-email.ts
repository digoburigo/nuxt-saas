import { useCompiler } from "#vue-email";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

type Props = {
  emailTemplate: string;
  props: any;
  to: string;
  subject: string;
};

export async function sendEmail({ emailTemplate, props, to, subject }: Props) {
  const template = await useCompiler(emailTemplate, {
    props
  });

  const smtpOptions: SMTPTransport.Options = {
    // remove "service"
    service: "Gmail",
    host: process.env.SMTP_HOST || "smtp.mailtrap.io",
    port: parseInt(process.env.SMTP_PORT || "2525"),
    secure: true,
    // secure: false,
    auth: {
      user: process.env.SMTP_USER || "user",
      pass: process.env.SMTP_PASSWORD || "password",
    },
  };

  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  const options = {
    from: process.env.SMTP_FROM_EMAIL || "rodrigobesmeraldino@gmail.com",
    to,
    subject,
    html: template.html,
  };

  await transporter.sendMail(options);
}
