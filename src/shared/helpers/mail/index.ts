import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import { env } from "@shared/env"
import { IMailProps } from "./IMailProvider"

class MailProvider {
  private readonly client: Mail

  constructor() {
    this.client = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secureConnection: env.MAIL_SECURITY,
      requireTLS: true,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
      logger: true,
      debug: true,
    })
  }

  async sendMail({ to, subject, template }: IMailProps) {
    await this.client.sendMail({
      from: env.MAIL_FROM,
      to,
      subject,
      html: template,
    })
  }
}

export { MailProvider }
