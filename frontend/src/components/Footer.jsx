import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-20 rounded-3xl border border-emerald-100 bg-white/90 p-8 shadow-sm">
      <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <img className="mb-4 w-40" src={assets.logo} alt="Appointo logo" />
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Appointo helps you find trusted doctors, compare specialties, and
            secure appointments without waiting on calls.
          </p>
        </div>

        <div>
          <p className="mb-3 text-base font700 font-semibold text-slate-800">Company</p>
          <div className="space-y-2 text-sm text-slate-600">
            <Link className="block hover:text-emerald-700" to="/">
              Home
            </Link>
            <Link className="block hover:text-emerald-700" to="/about">
              About
            </Link>
            <Link className="block hover:text-emerald-700" to="/contact">
              Contact
            </Link>
            <p>Privacy Policy</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-base font-semibold text-slate-800">Get in touch</p>
          <div className="space-y-2 text-sm text-slate-600">
            <p>+91 94417 18972</p>
            <p>support@appointeo.health</p>
            <p>Mon - Sat, 8:00 AM to 8:00 PM</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-emerald-100 pt-4 text-center text-xs text-slate-500">
        Copyright {new Date().getFullYear()} Appointo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
