import nodemailer from 'nodemailer';
import { Config } from './accounts/config'

export default class EmailService{

  async verifyEmail(){
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
          user: Config.EMAIL.username,
          pass: Config.EMAIL.password
      }
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
       to: 'danielminter13@gmail.com', // list of receivers
       subject: 'Subject ✔',
       text: 'Text?',
       html: '<b>Hello world?</b>'
  });

  console.log('Message sent: %s', info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

}
