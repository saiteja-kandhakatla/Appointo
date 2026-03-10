import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Doctors", path: "/doctors" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="sticky top-2 z-30 rounded-2xl border border-emerald-100 bg-white/85 px-3 py-3 backdrop-blur sm:px-4 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            className="w-28 sm:w-32 md:w-40"
            src={assets.logo}
            alt="Appointo logo"
          />
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-slate-700 hover:bg-emerald-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {token ? (
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 p-1 pr-3"
              >
                <img
                  className="h-9 w-9 rounded-full object-cover"
                  src={userData?.image || assets.profile_pic}
                  alt="User profile"
                />
                <span className="text-sm font-semibold text-slate-700">
                  {userData?.name?.split(" ")[0] || "Account"}
                </span>
                <img className="w-3" src={assets.dropdown_icon} alt="Menu" />
              </button>
              <div className="pointer-events-none absolute right-0 top-12 hidden min-w-52 rounded-xl border border-emerald-100 bg-white p-2 shadow-xl group-hover:pointer-events-auto group-hover:block">
                <button
                  type="button"
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-emerald-50"
                  onClick={() => navigate("/my-profile")}
                >
                  My Profile
                </button>
                <button
                  type="button"
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-emerald-50"
                  onClick={() => navigate("/my-appointments")}
                >
                  My Appointments
                </button>
                <button
                  type="button"
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  onClick={logOut}
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              onClick={() => navigate("/login")}
            >
              Create account
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {!token && (
            <button
              type="button"
              className="rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
              onClick={() => navigate("/login")}
            >
              Join
            </button>
          )}
          <button
            type="button"
            className="rounded-lg border border-emerald-100 p-2"
            onClick={() => setShowMenu(true)}
          >
            <img className="w-5" src={assets.menu_icon} alt="Open menu" />
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 md:hidden">
          <div className="ml-auto h-full w-4/5 max-w-xs bg-white p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <img className="w-32" src={assets.logo} alt="Appointo logo" />
              <button type="button" onClick={() => setShowMenu(false)}>
                <img className="w-6" src={assets.cross_icon} alt="Close menu" />
              </button>
            </div>

            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive ? "bg-emerald-600 text-white" : "hover:bg-emerald-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4">
              {token ? (
                <>
                  <button
                    type="button"
                    className="mb-2 block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-emerald-50"
                    onClick={() => {
                      navigate("/my-profile");
                      setShowMenu(false);
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    type="button"
                    className="mb-2 block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-emerald-50"
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowMenu(false);
                    }}
                  >
                    My Appointments
                  </button>
                  <button
                    type="button"
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    onClick={() => {
                      logOut();
                      setShowMenu(false);
                    }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                  onClick={() => {
                    navigate("/login");
                    setShowMenu(false);
                  }}
                >
                  Create account
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
