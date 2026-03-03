import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-20 overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-r from-cyan-600 via-sky-600 to-emerald-700 px-6 py-10 text-white md:px-10">
      <div className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-cyan-100">
            READY TO GET STARTED?
          </p>
          <h3 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
            Create your account and book
            <br />
            with 100+ trusted doctors.
          </h3>
          <button
            type="button"
            className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-bold text-cyan-700 transition hover:scale-105"
            onClick={() => {
              navigate("/login");
              window.scrollTo(0, 0);
            }}
          >
            Create account
          </button>
        </div>

        <div className="mx-auto hidden w-full max-w-sm md:block">
          <img src={assets.appointment_img} alt="Book appointment" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
