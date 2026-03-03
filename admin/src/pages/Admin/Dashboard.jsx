import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) {
    return <div className="panel p-6 text-sm text-slate-600">Loading dashboard...</div>;
  }

  const cards = [
    { label: "Doctors", value: dashData.doctors, icon: assets.doctor_icon },
    {
      label: "Appointments",
      value: dashData.appointments,
      icon: assets.appointments_icon,
    },
    { label: "Patients", value: dashData.patients, icon: assets.patients_icon },
  ];

  return (
    <section className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.label} className="panel flex items-center gap-4 p-5">
            <img className="h-12 w-12" src={card.icon} alt={card.label} />
            <div>
              <p className="text-2xl font-extrabold text-slate-900">{card.value}</p>
              <p className="text-sm text-slate-600">{card.label}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="panel overflow-hidden">
        <div className="flex items-center gap-2 border-b border-sky-100 px-5 py-4">
          <img src={assets.list_icon} alt="Latest" />
          <p className="font-bold text-slate-900">Latest bookings</p>
        </div>

        <div className="divide-y divide-slate-100">
          {dashData.latestAppointments.map((item) => (
            <div key={item._id} className="flex items-center gap-3 px-5 py-3">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={item.docData.image}
                alt={item.docData.name}
              />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-slate-900">{item.docData.name}</p>
                <p className="text-slate-600">{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  Cancelled
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => cancelAppointment(item._id)}
                  className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
