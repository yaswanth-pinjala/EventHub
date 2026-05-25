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
  await transporter.sendMail({
    from: `"EventHub" <${process.env.EMAIL}>`,
    to,
    subject,
    html
  });
};