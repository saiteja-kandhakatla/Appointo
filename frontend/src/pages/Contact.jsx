import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <section className="mt-10">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold tracking-[0.22em] text-emerald-700">CONTACT US</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">We are here to help</h1>
      </div>

      <div className="grid gap-8 rounded-3xl border border-emerald-100 bg-white p-6 md:grid-cols-[300px_1fr] md:p-8">
        <img
          className="h-full w-full rounded-2xl object-cover"
          src={assets.contact_image}
          alt="Contact Appointo"
        />

        <div className="space-y-5 text-sm text-slate-600">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-slate-500">HEAD OFFICE</p>
            <p className="mt-2 leading-6">
              Ushodaya Colony, Plot 90 & 91,
              <br />
              Gajularamaram, Hyderabad
            </p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-slate-500">SUPPORT</p>
            <p className="mt-2">+91 94417 18972</p>
            <p>support@appointo.health</p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-slate-500">CAREERS</p>
            <p className="mt-2">Want to shape healthcare experiences with us?</p>
          </div>

          <button
            type="button"
            className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
          >
            Explore jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
