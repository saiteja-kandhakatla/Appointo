import { assets } from "../assets/assets";

const About = () => {
  return (
    <section className="mt-10">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold tracking-[0.22em] text-emerald-700">ABOUT APPOINTO</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">A smarter way to access care</h1>
      </div>

      <div className="grid gap-8 rounded-3xl border border-emerald-100 bg-white p-6 md:grid-cols-[300px_1fr] md:p-8">
        <img
          className="h-full w-full rounded-2xl object-cover"
          src={assets.about_image}
          alt="About Appointo"
        />

        <div className="space-y-4 text-sm leading-7 text-slate-600">
          <p>
            Appointo simplifies how patients connect with healthcare providers.
            We remove friction from searching, comparing, and booking.
          </p>
          <p>
            The platform is built for speed and trust: clear doctor profiles,
            transparent fees, and straightforward appointment management.
          </p>
          <p>
            Our goal is practical healthcare access for everyone, with a booking
            experience that feels modern and reliable.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Efficient",
            desc: "Book in minutes with real-time doctor availability.",
          },
          {
            title: "Reliable",
            desc: "Profiles are structured so you can choose with confidence.",
          },
          {
            title: "Personal",
            desc: "Manage your appointments and profile in one secure place.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-emerald-100 bg-white p-5"
          >
            <h2 className="text-lg font-bold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default About;
