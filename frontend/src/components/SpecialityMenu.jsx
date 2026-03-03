import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="mt-16">
      <div className="mb-6 text-center">
        <p className="text-xs font-bold tracking-[0.22em] text-emerald-700">
          EXPLORE SPECIALITIES
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
          Start with the right expert
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specialityData.map((item) => (
          <Link
            key={item.speciality}
            to={`/doctors/${item.speciality}`}
            onClick={() => window.scrollTo(0, 0)}
            className="group rounded-2xl border border-emerald-100 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-2xl bg-emerald-50 p-3">
              <img className="h-12 w-12" src={item.image} alt={item.speciality} />
            </div>
            <p className="font-semibold text-slate-800">{item.speciality}</p>
            <p className="mt-1 text-sm text-slate-500 group-hover:text-emerald-700">
              View doctors
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
