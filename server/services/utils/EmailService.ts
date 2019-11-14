import nodemailer from 'nodemailer';
import { Config } from '../accounts/config'

export default class EmailService{

  async verifyEmail(email,key){
  let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
          user: process.env.EMAIL_USER || Config.EMAILUSER,
          pass: process.env.EMAIL_PASS || Config.EMAILPASS
      }
  });
  let global_url = `http://audago-zen.herokuapp.com/verify_signup/${email}$${key}`
  let dev_url =  `http://localhost:4000/verify_signup/${email}$${key}`
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
       to: 'example@example.com',
       subject: 'Subject ✔',
       text: 'Text?',
       html: `<a href=${global_url}>Verify Account</a>`
  });

  console.log('Message sent: %s', info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

}
