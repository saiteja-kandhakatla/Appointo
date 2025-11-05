// login register upadte profole book appointment cancel payament gateway

// import
const cloudinary = require("cloudinary").v2;
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

// Api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      text: "Error in register user",
    });
  }
};

// api to ger user profile data
const getProfile = async (req, res) => {
  try {
    // console.log(req.userId);

    const userId = req.userId;
    const userData = await userModel.findById(userId).select("-password");

    return res.json({ success: true, userData });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      text: "Error in register user",
    });
  }
};

// api to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      // uplaod image to cloundinart
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      text: "Error in register user",
    });
  }
};
module.exports = { registerUser, loginUser, getProfile, updateProfile };
