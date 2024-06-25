import { useCompiler } from "#vue-email";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export default defineEventHandler(async (event) => {
  try {
    const template = await useCompiler("EmailWelcome.vue", {
      props: {
        invitedByEmail: "<EMAIL>",
      },
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
      html: template.html,
    };

    await transporter.sendMail(options);
    return { message: "Email sent" };
  } catch (error) {
    console.error(error);
    return { message: error };
  }
});
