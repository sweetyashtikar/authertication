const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const formatedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: formatedEmail });
    if (!existingUser) {
      const error = new Error("No user found");
      error.statusCode = 400;
      throw error;
    }

    const isPassMatch = await bcrypt.compare(password, existingUser.password); // Fixed the argument issue
    if (!isPassMatch) {
      const error = new Error("Incorrect password");
      error.statusCode = 400;
      throw error;
    }

    const accessToken = jwt.sign(
      {
        email: formatedEmail,
        userId: existingUser._id,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "7d",
      }
    );

    res
      .status(200)
      .json({ message: "Login successful", status: true, token: accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
