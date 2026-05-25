const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
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