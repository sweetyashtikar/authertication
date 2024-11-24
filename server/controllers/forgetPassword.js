const User = require("../models/User");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");
const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const formatedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: formatedEmail });
    if (!existingUser) {
      const error = new Error("No user found");
      error.statusCode = 400;
      throw error;
    }

    // Check if the existing OTP has expired
    const currentTime = new Date().getTime();
    const otpExpirationTime =
      new Date(existingUser.otp.sendTime).getTime() + 5 * 60 * 1000; // OTP valid for 5 minutes

    if (currentTime < otpExpirationTime) {
      const error = new Error(
        `Please wait until ${new Date(
          otpExpirationTime
        ).toLocaleTimeString()} to request another OTP`
      );
      error.statusCode = 400;
      throw error;
    }

    // Generate a new OTP and token
    const otp = Math.floor(Math.random() * 90000) + 100000;
    console.log("Generated OTP:", otp);

    const token = crypto.randomBytes(32).toString("hex");

    existingUser.otp.otp = otp;
    existingUser.otp.sendTime = new Date().getTime() +1*60*1000; // Set current time
    existingUser.otp.token = token;

    await existingUser.save();
    sendMail(otp, formatedEmail);
    // Send response back to the client
    res.status(200).json({
      message: "Please check your email for OTP",
      status: true,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = forgetPassword;
