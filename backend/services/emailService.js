const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
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