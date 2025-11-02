// login register upadte profole book appointment cancel payament gateway

// import
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: userModel } = require("../Models/userModel");
// api to register to user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "missing details" });
    }
    // validate the email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    // encrypt the password->hashing,
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      text: "Error in register user",
    });
  }
};

module.exports = { registerUser };
