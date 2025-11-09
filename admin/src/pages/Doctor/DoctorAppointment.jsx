import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const { dToken, getAppointments, appointments, cancelAppointment } =
    useContext(DoctorContext);
  useEffect(() => {
    if (dToken) {
      console.log(appointments);
      getAppointments();
    }
  }, [dToken]);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  return (
    // <div className="w-full max-w-6xl m-5">
    //   <p mb->All Appointments</p>
    //   <div>
    //     <div>
    //       <p>#</p>
    //       <p>Patient Details</p>
    //       <p>Payment</p>
    //       <p>Age</p>
    //       <p>Date & Time</p>
    //       <p>Fees</p>
    //       <p>Action</p>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll hide-scrollbar">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => (
          <div
            className="grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-cols-1 justify-between items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50 max-sm:gap-2"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>

            {/* Patient info */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={item.userData.image}
                alt={item.userData.name}
              />
              <p>{item.userData.name}</p>
            </div>

            <p>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)} - {item.slotTime}
            </p>
            <p>{item.docData.name}</p>
            <p>₹{item.amount}</p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt="cancel icon"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
