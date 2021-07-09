import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/iMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private clent: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.clent = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const mail = await this.clent.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });
    console.log('Message sent: %s', mail.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mail));
  }
}
