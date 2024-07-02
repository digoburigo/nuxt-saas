import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

import EmailWelcome from '~/emails/EmailWelcome.vue';
import { render } from '@vue-email/render';

export default defineEventHandler(async (event) => {
  try {
    const html = await render(EmailWelcome, {
      invitedByEmail: "<EMAIL>",
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
      from: "rodrigobesmeraldino@gmail.com",
      to: "rodrigobesmeraldino@gmail.com",
      subject: "hello world",
      html,
    };

    await transporter.sendMail(options);
    return { message: "Email sent" };
  } catch (error) {
    console.error(error);
    return { message: error };
  }
});
