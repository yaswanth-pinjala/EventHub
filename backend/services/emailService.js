const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 60000,
  greetingTimeout: 60000,
  socketTimeout: 60000,

});


exports.sendEmail = async (to, subject, html) => {

  try {

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html,
    });

    console.log("EMAIL SENT:", info.response);

  } catch (err) {

    console.error("EMAIL FAILED:", err);

    throw err;

  }

};