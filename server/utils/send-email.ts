import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { render } from "@vue-email/render";
import type { Component } from "vue";

const config = useRuntimeConfig();

type Props = {
  emailTemplate: Component;
  props: object;
  to: string;
  subject: string;
};

export async function sendEmail({ emailTemplate, props, to, subject }: Props) {
  const html = await render(emailTemplate, {
    ...props,
  });

  const smtpOptions: SMTPTransport.Options = {
    // remove "service"
    service: "Gmail",
    host: config.smtpHost || "smtp.mailtrap.io",
    port: parseInt(config.smtpPort || "2525"),
    secure: true,
    // secure: false,
    auth: {
      user: config.smtpUser || "user",
      pass: config.smtpPassword || "password",
    },
  };

  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  const options = {
    from: config.smtpFromEmail || "rodrigobesmeraldino@gmail.com",
    to,
    subject,
    html,
  };

  await transporter.sendMail(options);
}
