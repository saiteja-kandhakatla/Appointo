import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailablity } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <section className="panel p-5 md:p-6">
      <h1 className="mb-4 text-2xl font-extrabold text-slate-900">Doctors</h1>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {doctors.map((doctor) => (
          <article
            key={doctor._id}
            className="overflow-hidden rounded-2xl border border-sky-100 bg-white"
          >
            <div className="bg-sky-50 p-2">
              <img
                className="h-52 w-full rounded-xl object-cover"
                src={doctor.image}
                alt={doctor.name}
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-bold text-slate-900">{doctor.name}</p>
              <p className="text-sm text-slate-600">{doctor.speciality}</p>

              <label className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={doctor.available}
                  onChange={() => changeAvailablity(doctor._id)}
                />
                Available
              </label>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DoctorsList;
