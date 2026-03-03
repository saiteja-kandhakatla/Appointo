import { assets } from "../assets/assets";

const Header = () => {
  return (
    <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-cyan-700 px-6 py-10 text-white md:px-10 md:py-14">
      <div className="absolute -right-12 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-16 left-6 h-52 w-52 rounded-full bg-cyan-200/20 blur-2xl" />

      <div className="relative grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="mb-3 inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs font-semibold tracking-wide">
            SAME-DAY SLOTS AVAILABLE
          </p>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            Healthcare booking,
            <br />
            reimagined for speed.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-50 md:text-base">
            Discover verified specialists, choose transparent fees, and schedule
            appointments in minutes.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <img className="w-28" src={assets.group_profiles} alt="Patients" />
            <p className="text-emerald-50">10,000+ patients booked this month</p>
          </div>

          <a
            href="#speciality"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-700 transition hover:scale-105"
          >
            Find a specialist
            <img className="w-3" src={assets.arrow_icon} alt="arrow" />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 scale-95 rounded-3xl bg-cyan-200/25 blur-2xl" />
          <img
            className="relative rounded-3xl border border-white/20 shadow-2xl"
            src={assets.header_img}
            alt="Doctors"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
