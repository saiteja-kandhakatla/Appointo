const validator = require("validator");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const doctorModel = require("../Models/doctorModel");
const appointmentModel = require("../Models/appointmentModel");
const userModel = require("../Models/userModel");
const { releaseDoctorSlot } = require("../utils/appointmentUtils");

const addDoctor = async (req, res) => {
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
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 8 chars" });
    }

    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(409).json({ success: false, message: "Doctor already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const doctorData = {
      name,
      email,
      image: imageUpload.secure_url,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    await doctorModel.create(doctorData);
    return res.json({ success: true, message: "Doctor added" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials" });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const key = `${email}${password}`;
      const token = jwt.sign(key, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    }

    return res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    return res.json({ success: true, doctors });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    return res.json({ success: true, appointments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "appointmentId is required" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.cancelled) {
      return res.json({ success: true, message: "Appointment already cancelled" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    await releaseDoctorSlot({
      docId: appointmentData.docId,
      slotDate: appointmentData.slotDate,
      slotTime: appointmentData.slotTime,
    });

    return res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const adminDashboard = async (req, res) => {
  try {
    const [doctors, users, appointments] = await Promise.all([
      doctorModel.find({}),
      userModel.find({}),
      appointmentModel.find({}),
    ]);

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: [...appointments].reverse().slice(0, 5),
    };

    return res.json({ success: true, dashData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
