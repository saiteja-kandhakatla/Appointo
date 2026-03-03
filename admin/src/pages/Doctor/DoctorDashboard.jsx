import { useContext, useEffect, useMemo } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, getAppointments, appointments } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const stats = useMemo(() => {
    const total = appointments.length;
    const cancelled = appointments.filter((item) => item.cancelled).length;
    const completed = appointments.filter((item) => !item.cancelled).length;
    const earnings = appointments
      .filter((item) => item.payment && !item.cancelled)
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    return { total, cancelled, completed, earnings };
  }, [appointments]);

  return (
    <section className="space-y-5">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total", value: stats.total },
          { label: "Active", value: stats.completed },
          { label: "Cancelled", value: stats.cancelled },
          { label: "Earnings", value: `₹${stats.earnings}` },
        ].map((card) => (
          <article key={card.label} className="panel p-5">
            <p className="text-xs font-bold tracking-[0.12em] text-slate-500">{card.label}</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">{card.value}</p>
          </article>
        ))}
      </div>

      <div className="panel p-5">
        <h2 className="mb-3 text-xl font-extrabold text-slate-900">Recent appointments</h2>

        <div className="space-y-3">
          {appointments.slice(0, 6).map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"
            >
              <div>
                <p className="font-semibold text-slate-900">{item.userData.name}</p>
                <p className="text-sm text-slate-600">
                  {slotDateFormat(item.slotDate)} • {item.slotTime}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  item.cancelled
                    ? "bg-red-50 text-red-600"
                    : item.payment
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {item.cancelled ? "Cancelled" : item.payment ? "Paid" : "Pending"}
              </span>
            </div>
          ))}

          {appointments.length === 0 && (
            <p className="text-sm text-slate-600">No appointments available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DoctorDashboard;
