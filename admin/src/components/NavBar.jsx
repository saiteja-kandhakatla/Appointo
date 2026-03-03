import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const logout = () => {
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }

    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }

    navigate("/");
  };

  return (
    <header className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
      <div className="flex items-center gap-3">
        <img className="w-36 sm:w-40" src={assets.admin_logo} alt="Admin logo" />
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
          {aToken ? "Admin panel" : "Doctor panel"}
        </span>
      </div>

      <button
        type="button"
        className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        onClick={logout}
      >
        Logout
      </button>
    </header>
  );
};

export default NavBar;
