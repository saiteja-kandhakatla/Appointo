import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const adminLinks = [
    { to: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
    {
      to: "/all-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    { to: "/add-doctor", icon: assets.add_icon, label: "Add doctor" },
    { to: "/doctor-list", icon: assets.people_icon, label: "Doctors" },
  ];

  const doctorLinks = [
    { to: "/doctor-dashboard", icon: assets.home_icon, label: "Dashboard" },
    {
      to: "/doctor-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    { to: "/doctor-profile", icon: assets.people_icon, label: "Profile" },
  ];

  const links = aToken ? adminLinks : dToken ? doctorLinks : [];

  return (
    <aside className="panel h-fit p-3 md:sticky md:top-24">
      <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-1 md:space-y-1">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-sky-600 text-white shadow"
                  : "text-slate-600 hover:bg-sky-50"
              }`
            }
          >
            <img className="h-4 w-4" src={item.icon} alt={item.label} />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
