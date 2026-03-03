import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "./RelatedDoctors";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  useEffect(() => {
    const selectedDoctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(selectedDoctor || null);
    setSlotIndex(0);
    setSlotTime("");
  }, [doctors, docId]);

  useEffect(() => {
    if (!docInfo) return;

    const next7Days = [];
    const today = new Date();

    for (let i = 0; i < 7; i += 1) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const slotsForDay = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const isBooked =
          docInfo.slots_booked?.[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedTime);

        if (!isBooked) {
          slotsForDay.push({ dateTime: new Date(currentDate), time: formattedTime });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      next7Days.push(slotsForDay);
    }

    setDocSlots(next7Days);
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please log in to book an appointment.");
      navigate("/login");
      return;
    }

    if (!docSlots[slotIndex]?.length || !slotTime) {
      toast.warn("Please pick a date and time slot first.");
      return;
    }

    try {
      const selectedDate = docSlots[slotIndex][0].dateTime;
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      await getDoctorsData();
      navigate("/my-appointments");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!docInfo) {
    return (
      <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-700">
        Doctor information is unavailable right now.
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white p-3">
          <img
            className="h-full w-full rounded-2xl bg-emerald-50 object-cover"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900">{docInfo.name}</h1>
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </div>
          <p className="text-sm text-slate-600">
            {docInfo.degree} • {docInfo.speciality}
          </p>
          <p className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {docInfo.experience} experience
          </p>

          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
              About
              <img className="w-4" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm leading-6 text-slate-600">{docInfo.about}</p>
          </div>

          <p className="mt-5 text-sm font-semibold text-slate-700">
            Consultation fee: {currencySymbol}
            {docInfo.fees}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-emerald-100 bg-white p-6">
        <h2 className="text-xl font-extrabold text-slate-900">Select booking slot</h2>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {docSlots.map((slots, index) => (
            <button
              type="button"
              key={`day-${index}`}
              className={`min-w-16 rounded-2xl px-4 py-3 text-center text-sm font-semibold ${
                slotIndex === index
                  ? "bg-emerald-600 text-white"
                  : "border border-slate-200 text-slate-600"
              }`}
              onClick={() => {
                setSlotIndex(index);
                setSlotTime("");
              }}
              disabled={!slots.length}
            >
              <p>{slots[0] ? daysOfWeek[slots[0].dateTime.getDay()] : "N/A"}</p>
              <p>{slots[0] ? slots[0].dateTime.getDate() : "-"}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {docSlots[slotIndex]?.length ? (
            docSlots[slotIndex].map((slot) => (
              <button
                type="button"
                key={slot.time}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  slot.time === slotTime
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-300 text-slate-600 hover:bg-emerald-50"
                }`}
                onClick={() => setSlotTime(slot.time)}
              >
                {slot.time.toLowerCase()}
              </button>
            ))
          ) : (
            <p className="text-sm text-slate-500">No slots available for this day.</p>
          )}
        </div>

        <button
          type="button"
          className="mt-5 rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          onClick={bookAppointment}
        >
          Book appointment
        </button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </section>
  );
};

export default Appointment;
