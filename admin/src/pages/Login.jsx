import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (!data.success) {
          toast.error(data.message);
          return;
        }

        localStorage.setItem("aToken", data.token);
        setAToken(data.token);
        toast.success("Admin login successful");
        return;
      }

      const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
        email,
        password,
      });

      if (!data.success) {
        toast.error(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("dToken", data.token);
      setDToken(data.token);
      toast.success("Doctor login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-16 w-[min(92vw,460px)] rounded-3xl border border-sky-100 bg-white p-8 shadow-xl">
      <p className="text-xs font-bold tracking-[0.2em] text-sky-700">CONTROL CENTER</p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
        {state} sign in
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Access appointments, doctors, and live activity from one dashboard.
      </p>

      <form onSubmit={onSubmitHandler} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
            required
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        {state === "Admin" ? "Need Doctor login?" : "Need Admin login?"}{" "}
        <button
          type="button"
          onClick={() => setState((prev) => (prev === "Admin" ? "Doctor" : "Admin"))}
          className="font-semibold text-sky-700 underline"
        >
          Switch now
        </button>
      </p>
    </section>
  );
};

export default Login;
