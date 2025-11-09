const validator = require("validator");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const doctorModel = require("../Models/doctorModel");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../Models/appointmentModel");
const { default: userModel } = require("../Models/userModel");
const addDoctor = async (req, res) => {
  // res.send({ message: "Insid eadd adcor " });
  try {
    const imageFile = req.file;
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

// API to get all doctors for admin panel
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");

    return res.send({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// APi to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// API to cancel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    // console.log(appointmentId);
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked || {};

    if (slots_booked[slotDate]) {
      // remove the cancelled slot
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
    }
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      text: "Error in appointment api",
    });
  }
};

// Api to get dashboard
const adminDashboard = async (req, res) => {
  try {
    // total no of users and top 5
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (e) {
    return res.json({
      success: false,
      message: error.message,
      text: "Error in appointment api",
    });
  }
};
module.exports = {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard
};
