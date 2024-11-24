const User = require("../models/User");
const bcrypt = require("bcrypt");

const updatedPassword = async (req, res, next) => {
  const { password, confirmPassword, token } = req.body;

  try {
    // Check if token exists and match the user
    const existingUser = await User.findOne({ "otp.token": token });
    if (!existingUser) {
      const error = new Error("something went wrong");
      error.statusCode = 400;
      throw error;
    }

    // Check if OTP has expired (5-minute window)
    if (
      new Date(existingUser.otp.sendTime).getTime() + 5 * 60 * 1000 <
      new Date().getTime()
    ) {
      const error = new Error("something went wrong");
      error.statusCode = 400;
      throw error;
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        const error = new Error("Passwords do not match");
        error.statusCode = 400;
        throw error;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
      existingUser.otp.sendTime = null;
     existingUser.otp.token = null;
     await existingUser.save();

     res.status(200).json({ message: "Password updated successfully",status:true });
    }
  catch(error){
    next(error)
  }
    }




module.exports = updatedPassword;
