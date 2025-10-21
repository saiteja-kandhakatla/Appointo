const validator = require("validator");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const doctorModel = require("../Models/doctorModel");
const jwt = require("jsonwebtoken");
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    //  if missing fields->
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !about ||
      !experience ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }
    // validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter the valid email",
      });
    }

    // validate the password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing the doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// amdin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email == process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const key = email + password;
      // console.log("Key in lgon admin: : ", key);
      const token = jwt.sign(key, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credientials" });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
      text: "in login admin",
    });
  }
};
module.exports = { addDoctor, loginAdmin };
