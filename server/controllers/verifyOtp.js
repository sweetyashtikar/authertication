const User = require("../models/User");

const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;

  try {
    const existingUser = await User.findOne({ "otp.otp": otp });
    if (!existingUser) {
      const error = new Error("Invalid OTP");
      error.statusCode = 400;
      throw error;
    }

    if (new Date(existingUser.otp.sendTime).getTime() < new Date().getTime()) {
      const error = new Error("otp expired");
      error.statusCode = 400;
      throw error;
    }

    existingUser.otp.otp = null;
    await existingUser.save();
    res.status(200).json({ message: "otp verified", status: true });
  } catch (error) {
    next(error);
  }
};


module.exports=verifyOtp;