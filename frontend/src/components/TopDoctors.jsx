import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="mt-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.22em] text-emerald-700">
            RECOMMENDED
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            Top doctors near you
          </h2>
        </div>
        <button
          type="button"
          className="rounded-full border border-emerald-200 px-5 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          onClick={() => navigate("/doctors")}
        >
          View all doctors
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {doctors.slice(0, 8).map((doctor) => (
          <button
            type="button"
            key={doctor._id}
            onClick={() => {
              navigate(`/appointments/${doctor._id}`);
              window.scrollTo(0, 0);
            }}
            className="overflow-hidden rounded-2xl border border-emerald-100 bg-white text-left transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="bg-emerald-50 p-2">
              <img
                className="h-48 w-full rounded-xl object-cover"
                src={doctor.image}
                alt={doctor.name}
              />
            </div>
            <div className="p-4">
              <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Available today
              </p>
              <p className="text-base font-bold text-slate-900">{doctor.name}</p>
              <p className="text-sm text-slate-600">{doctor.speciality}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TopDoctors;
