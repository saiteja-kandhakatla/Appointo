import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <section className="panel p-4 md:p-6">
      <h1 className="mb-4 text-2xl font-extrabold text-slate-900">All appointments</h1>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-sky-100 text-slate-600">
              <th className="py-3 pr-3">#</th>
              <th className="py-3 pr-3">Patient</th>
              <th className="py-3 pr-3">Age</th>
              <th className="py-3 pr-3">Date & Time</th>
              <th className="py-3 pr-3">Doctor</th>
              <th className="py-3 pr-3">Fee</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, index) => (
              <tr key={item._id} className="border-b border-slate-100">
                <td className="py-3 pr-3 text-slate-600">{index + 1}</td>
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={item.userData.image}
                      alt={item.userData.name}
                    />
                    <span className="font-medium text-slate-800">{item.userData.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-3 text-slate-600">{calculateAge(item.userData.dob)}</td>
                <td className="py-3 pr-3 text-slate-600">
                  {slotDateFormat(item.slotDate)} • {item.slotTime}
                </td>
                <td className="py-3 pr-3 text-slate-700">{item.docData.name}</td>
                <td className="py-3 pr-3 font-medium text-slate-900">₹{item.amount}</td>
                <td className="py-3">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllAppointments;
