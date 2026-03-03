import { useContext, useEffect, useMemo } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const profile = useMemo(() => {
    const source = appointments.find((item) => item.docData) || null;
    if (!source) return null;

    return {
      name: source.docData.name,
      image: source.docData.image,
      speciality: source.docData.speciality,
      degree: source.docData.degree,
      experience: source.docData.experience,
      about: source.docData.about,
      fees: source.docData.fees,
      address: source.docData.address,
    };
  }, [appointments]);

  if (!profile) {
    return (
      <section className="panel p-6 text-sm text-slate-600">
        Doctor profile data will appear once appointments are available.
      </section>
    );
  }

  return (
    <section className="panel p-5 md:p-6">
      <div className="grid gap-5 md:grid-cols-[180px_1fr]">
        <img
          className="h-44 w-44 rounded-2xl object-cover"
          src={profile.image}
          alt={profile.name}
        />

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{profile.name}</h1>
          <p className="mt-1 text-sm text-slate-600">
            {profile.degree} • {profile.speciality}
          </p>
          <p className="mt-2 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
            {profile.experience}
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">About</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{profile.about}</p>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-xs font-bold tracking-[0.12em] text-slate-500">FEES</p>
              <p className="mt-1 text-lg font-bold text-slate-900">₹{profile.fees}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-xs font-bold tracking-[0.12em] text-slate-500">ADDRESS</p>
              <p className="mt-1 text-sm text-slate-700">
                {profile.address?.line1}
                <br />
                {profile.address?.line2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
