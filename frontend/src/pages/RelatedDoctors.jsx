import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ docId, speciality }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relatedDoctors, setRelatedDoctors] = useState([]);

  useEffect(() => {
    if (!speciality) return;

    const related = doctors.filter(
      (doc) => doc.speciality === speciality && doc._id !== docId
    );
    setRelatedDoctors(related);
  }, [doctors, speciality, docId]);

  if (relatedDoctors.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h3 className="text-2xl font-extrabold text-slate-900">Related doctors</h3>
        <button
          type="button"
          className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700"
          onClick={() => navigate("/doctors")}
        >
          All doctors
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {relatedDoctors.slice(0, 4).map((item) => (
          <button
            type="button"
            key={item._id}
            onClick={() => {
              navigate(`/appointments/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="overflow-hidden rounded-2xl border border-emerald-100 bg-white text-left transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="bg-emerald-50 p-2">
              <img
                className="h-48 w-full rounded-xl object-cover"
                src={item.image}
                alt={item.name}
              />
            </div>
            <div className="p-4">
              <p className="text-base font-bold text-slate-900">{item.name}</p>
              <p className="text-sm text-slate-600">{item.speciality}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default RelatedDoctors;
