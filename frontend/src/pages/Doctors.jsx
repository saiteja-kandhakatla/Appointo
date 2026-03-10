import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { specialityData } from "../assets/assets";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const specialities = useMemo(
    () => specialityData.map((item) => item.speciality),
    []
  );

  useEffect(() => {
    if (speciality) {
      setFilteredDoctors(doctors.filter((doc) => doc.speciality === speciality));
      return;
    }
    setFilteredDoctors(doctors);
  }, [doctors, speciality]);

  return (
    <section className="mt-10">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-[0.22em] text-emerald-700">
          FIND YOUR DOCTOR
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Browse verified specialists
        </h1>
      </div>

      <div className="mb-3 md:hidden">
        <button
          type="button"
          className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {showFilter ? "Hide filters" : "Show filters"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[260px_1fr] md:gap-6">
        <aside
          className={`space-y-2 ${
            showFilter ? "block" : "hidden md:block"
          } h-fit rounded-2xl border border-emerald-100 bg-white p-4 md:sticky md:top-24`}
        >
          <button
            type="button"
            className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
              !speciality
                ? "bg-emerald-600 text-white"
                : "hover:bg-emerald-50 text-slate-700"
            }`}
            onClick={() => navigate("/doctors")}
          >
            All specialities
          </button>

          {specialities.map((item) => (
            <button
              type="button"
              key={item}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                speciality === item
                  ? "bg-emerald-600 text-white"
                  : "hover:bg-emerald-50 text-slate-700"
              }`}
              onClick={() => navigate(`/doctors/${item}`)}
            >
              {item}
            </button>
          ))}
        </aside>

        <div>
          {filteredDoctors.length === 0 ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-700">
              No doctors found for this speciality.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.map((doctor) => (
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
                      className="h-52 w-full rounded-xl object-cover sm:h-56"
                      src={doctor.image}
                      alt={doctor.name}
                    />
                  </div>
                  <div className="p-4">
                    <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Available
                    </p>
                    <p className="text-base font-bold text-slate-900">{doctor.name}</p>
                    <p className="text-sm text-slate-600">{doctor.speciality}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
