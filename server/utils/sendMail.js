const nodemailer = require('nodemailer');

const sendMail = async (otp, email) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'GMAIL',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL, // corrected "form" to "from"
      to: email,
      subject: "Reset Password OTP",
      html: `<div>${otp}</div>`
    };

    await transport.sendMail(mailOptions); // used async/await for error handling
    console.log('Email sent successfully');
  } catch (error) {
    console.error("Failed to send email:", error.message);
  }
};

module.exports = sendMail;
