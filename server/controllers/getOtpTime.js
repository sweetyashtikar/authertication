const User = require("../models/User");

const getOtpTime = async (req, res, next) => {
  const { token } = req.body;

  try {
    const existingUser = await User.findOne({ "otp.token": token }).select(
      "otp"
    );
    if (!existingUser) {
      const error = new Error("something went wrong");
      error.statusCode = 400;
      throw error;
    }

    res
      .status(200)
      .json({ message: "success", status: true, 
        sendTime: existingUser.otp.sendTime, });
  } catch (error) {
    next(error)
  }
};

module.exports=getOtpTime;
