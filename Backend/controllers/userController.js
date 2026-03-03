const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const Razorpay = require("razorpay");
const userModel = require("../Models/userModel");
const doctorModel = require("../Models/doctorModel");
const appointmentModel = require("../Models/appointmentModel");
const { releaseDoctorSlot } = require("../utils/appointmentUtils");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 8 chars" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId).select("-password");
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, userData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;

    if (!name || !phone || !address || !dob || !gender) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    await userModel.findByIdAndUpdate(req.userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });

      await userModel.findByIdAndUpdate(req.userId, {
        image: imageUpload.secure_url,
      });
    }

    return res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;

    if (!docId || !slotDate || !slotTime) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const doctor = await doctorModel.findById(docId).select("-password");
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    if (!doctor.available) {
      return res.status(400).json({ success: false, message: "Doctor not available" });
    }

    const slotsBooked = { ...(doctor.slots_booked || {}) };

    if (slotsBooked[slotDate]?.includes(slotTime)) {
      return res.status(400).json({ success: false, message: "Slot not available" });
    }

    slotsBooked[slotDate] = [...(slotsBooked[slotDate] || []), slotTime];

    const userData = await userModel.findById(req.userId).select("-password");

    const doctorForAppointment = doctor.toObject();
    delete doctorForAppointment.slots_booked;
    delete doctorForAppointment.password;

    await appointmentModel.create({
      userId: req.userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData: doctorForAppointment,
      amount: doctor.fees,
      date: Date.now(),
    });

    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });

    return res.json({ success: true, message: "Appointment booked" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const listAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ userId: req.userId });
    return res.json({ success: true, appointments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
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

    if (String(appointmentData.userId) !== String(req.userId)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
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

const paymentRazorPay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "appointmentId is required" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment cancelled or not found" });
    }

    if (String(appointmentData.userId) !== String(req.userId)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: String(appointmentId),
    };

    const order = await razorpayInstance.orders.create(options);
    return res.json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    if (!razorpay_order_id) {
      return res
        .status(400)
        .json({ success: false, message: "razorpay_order_id is required" });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status !== "paid") {
      return res.json({ success: false, message: "Payment unsuccessful" });
    }

    const appointment = await appointmentModel.findById(orderInfo.receipt);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (String(appointment.userId) !== String(req.userId)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
    return res.json({ success: true, message: "Payment successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  paymentRazorPay,
  verifyRazorpay,
};
