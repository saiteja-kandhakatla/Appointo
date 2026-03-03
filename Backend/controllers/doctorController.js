const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorModel = require("../Models/doctorModel");
const appointmentModel = require("../Models/appointmentModel");
const { releaseDoctorSlot } = require("../utils/appointmentUtils");

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res.status(400).json({ success: false, message: "docId is required" });
    }

    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    await doctorModel.findByIdAndUpdate(docId, {
      available: !doctorData.available,
    });

    return res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    return res.json({ success: true, doctors });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials" });
    }

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const appointmentsDoctor = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ docId: req.docId });
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

    if (String(appointmentData.docId) !== String(req.docId)) {
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

module.exports = {
  changeAvailablity,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
};
