import nodemailer from "nodemailer";
import config from "../../../config/nodemailer";

export class SenderEmail {
  async sender(email: string) {
    const mailSend = this.config();
    console.log(config.user, config.pass);
    const teste = await mailSend.sendMail({
      subject: "User account registration.",
      text: "Welcome to Search Jobs",
      from: `Eduardo Santana <${config.user}>`,
      to: email,
    });
    console.log(teste);
  }

  config() {
    const transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    return transport;
  }
}
