import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "./RelatedDoctors";
const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    // console.log(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting currDay
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // gettinf day with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);

      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() == currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedtime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // add slot to array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedtime,
        });
        // increment current time buy 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // useefecr
  // useEffect(() => {
  //   // console.log(docSlots);
  // }, [docSlots]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);
  return (
    docInfo && (
      <div>
        {/* ------------DOCtor Details----------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-indigo-500 w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* -------------Doc INfo :Name degree experice cost------------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
                <button className="py-0.5 px-2 border text-xs rounded-full">
                  {docInfo.experience}
                </button>
              </p>
            </div>

            {/* --------Doctor About------------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-mediium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            {/* Appointment fee */}
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* --------------Booking slots------------------------- */}
        <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
          <p>Booking slot</p>
          {/* date */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length != 0 &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? `bg-indigo-500 text-white`
                      : `border border-gray-200`
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* time */}
          <div className="flex items-center gap-3 w-full overflow-scroll-x mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? `bg-indigo-500 text-white`
                      : `text-gray-400 border border-gray-300`
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* --------Button tag to book appointment------ */}
        </div>
        <button className="bg-indigo-500 text-white text-sm  font-light px-14 py-3 rounded-full my-6">
          Book Appointment
        </button>

        {/* Related Docrtos */}
        <RelatedDoctors
          docId={docId}
          speciality={docInfo.speciality}
        ></RelatedDoctors>
      </div>
    )
  );
};

export default Appointment;
