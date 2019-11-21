import nodemailer from 'nodemailer';

export default class EmailService{

  async verifyEmail(email,key){
  let transporter = nodemailer.createTransport({
      host: 'smtp.yandex.com',
      port: 465,
      secure: true,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
  });
  let global_url = `http://audago-zen.herokuapp.com/verify_signup/${email}$${key}`
  let dev_url =  `http://localhost:4000/verify_signup/${email}$${key}`
  let info = await transporter.sendMail({
    from: '"Audago 👻" <audagomusic@yandex.com>',
       to: email,
       subject: 'Account verification ✔',
       text: 'Text?',
       html: `
       <h3>Click link below to verify your account.</h3><br>
       <a href=${dev_url}>Verify Account</a>`
  });

  // console.log('Message sent: %s', info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  return nodemailer.getTestMessageUrl(info)
}

}
