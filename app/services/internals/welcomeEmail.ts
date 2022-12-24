import SMTPTransport from 'nodemailer/lib/smtp-transport';
import nodemailer from 'nodemailer';
import { EmailParams } from '../../constants/email';

export const welcomeEmail = async (userParams: EmailParams): Promise<SMTPTransport.SentMessageInfo> => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
  const info = await transporter.sendMail({
    from: userParams.from,
    to: userParams.to,
    subject: userParams.subject,
    text: userParams.text,
    html: userParams.html
  });
  if (info) {
    return info;
  }
  throw new Error('Email not Delivered');
};
