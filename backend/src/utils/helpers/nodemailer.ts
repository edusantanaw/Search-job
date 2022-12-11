import nodemailer from "nodemailer";

export class SenderEmail {
  sender(email: string) {
    nodemailer.createTransport({
      from: "eduardosatanavidal@gmail.com",
      to: "eduardosantanaspfc@gmail.com",
    });
  }
}
