const doctorModel = require("../Models/doctorModel");

const releaseDoctorSlot = async ({ docId, slotDate, slotTime }) => {
  const doctorData = await doctorModel.findById(docId);
  if (!doctorData) return;

  const slotsBooked = doctorData.slots_booked || {};
  if (slotsBooked[slotDate]) {
    slotsBooked[slotDate] = slotsBooked[slotDate].filter(
      (time) => time !== slotTime
    );
    if (slotsBooked[slotDate].length === 0) {
      delete slotsBooked[slotDate];
    }
  }

  await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });
};

module.exports = {
  releaseDoctorSlot,
};
