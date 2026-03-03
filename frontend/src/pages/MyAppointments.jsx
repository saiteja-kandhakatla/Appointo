import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatSlotDate = (slotDate) => {
  const dateArray = slotDate.split("_");
  return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
};

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      await getUserAppointments();
      await getDoctorsData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razorpay`,
            response,
            { headers: { token } }
          );

          if (data.success) {
            await getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-700">
        Please login to view appointments.
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-[0.22em] text-emerald-700">MY BOOKINGS</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Appointment history</h1>
      </div>

      <div className="space-y-4">
        {appointments.map((item) => (
          <article
            key={item._id}
            className="grid gap-4 rounded-2xl border border-emerald-100 bg-white p-4 md:grid-cols-[120px_1fr_auto] md:items-center"
          >
            <img
              className="h-28 w-28 rounded-xl bg-emerald-50 object-cover"
              src={item.docData.image}
              alt={item.docData.name}
            />

            <div className="text-sm text-slate-600">
              <p className="text-lg font-bold text-slate-900">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="mt-2 text-slate-700">
                {item.docData.address.line1}, {item.docData.address.line2}
              </p>
              <p className="mt-1 font-semibold text-slate-800">
                {formatSlotDate(item.slotDate)} at {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col gap-2 md:min-w-44">
              {!item.cancelled && item.payment && (
                <button
                  type="button"
                  className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                >
                  Paid
                </button>
              )}

              {!item.cancelled && !item.payment && (
                <button
                  type="button"
                  className="rounded-lg border border-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                  onClick={() => appointmentRazorpay(item._id)}
                >
                  Pay online
                </button>
              )}

              {!item.cancelled && (
                <button
                  type="button"
                  className="rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  onClick={() => cancelAppointment(item._id)}
                >
                  Cancel
                </button>
              )}

              {item.cancelled && (
                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600"
                >
                  Cancelled
                </button>
              )}
            </div>
          </article>
        ))}

        {appointments.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            No appointments yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAppointments;
