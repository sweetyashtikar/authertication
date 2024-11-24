const User = require("../models/User");

const getAccess = async (req, res, next) => {
  const { token } = req.body;

  try {
    const existingUser = await User.findOne({ 'otp.token': token }); // fetch user by token

    if (!existingUser || existingUser.otp.token === null) {
      const error = new Error("Something went wrong");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({ message: 'Success', status: true });
  } catch (error) {
    next(error); // passing error to middleware
  }
};

module.exports = getAccess;
