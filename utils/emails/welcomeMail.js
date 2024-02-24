import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.AUTHENTICATION_SMPT_MAIL,
        pass: process.env.AUTHENTICATION_SMPT_MAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.AUTHENTICATION_SMPT_MAIL,
      to: user.email,
      subject: "Welcome to NodeJS Authenticator Application",
      html: `
    <div style="display:flex;justify-content:center;align-item:center">
    <img src="/Images/Hello-rafiki.svg">
    </div>
    <center >
    <p><h1>Welcome to NodeJS Authenticator Application</h1></p>
    <p><b>Hello,</b></p>
    </center>
    `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      } else {
        console.log(
          `Welcome email sent to ${user.email} and messageId : ` +
            info.messageId
        );
      }
    });
  } catch (error) {
    console.log("Error occurred while sending welcome email :" + error);
  }
};
