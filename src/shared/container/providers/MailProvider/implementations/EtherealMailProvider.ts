import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../model/IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transport = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transport;
      })
      .catch((error) => console.error(error));
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: 'Rental <noreplay@rentalx.com>',
      subject,
      text: body,
      html: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s ', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
