const User = require("../models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");

const register = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);
  const { name, email, password } = req.body;

  console.log("Password sent in request:", password); // Check the password sent

  try {
    // Validate input
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    // Check if email already exists
    const formatedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: formatedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists", status: false });
    }

    // Hash password and save the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name.toLowerCase(),
      email: formatedEmail,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "User registered successfully", status: true });
  } catch (error) {
    next(error);
  }
};
module.exports = register;

// Joi validation function
function validateUser(data) {
  const userSchma = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  return userSchma.validate(data);
}

