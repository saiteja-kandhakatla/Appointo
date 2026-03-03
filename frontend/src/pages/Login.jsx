import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const isSignup = authMode === "signup";
      const endpoint = isSignup
        ? `${backendUrl}/api/user/register-user`
        : `${backendUrl}/api/user/login`;

      const payload = isSignup
        ? { name: name.trim(), email: email.trim(), password }
        : { email: email.trim(), password };

      const { data } = await axios.post(endpoint, payload);

      if (!data.success) {
        toast.error(data.message || "Authentication failed.");
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success(isSignup ? "Account created" : "Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-14 max-w-xl rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm md:p-10">
      <p className="text-xs font-bold tracking-[0.22em] text-emerald-700">
        {authMode === "signup" ? "JOIN APPOINTO" : "WELCOME BACK"}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
        {authMode === "signup" ? "Create your account" : "Sign in to continue"}
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Secure your appointment history and manage bookings in one place.
      </p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        {authMode === "signup" && (
          <label className="block text-sm font-medium text-slate-700">
            Full name
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
        )}

        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : authMode === "signup"
            ? "Create account"
            : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        {authMode === "signup" ? "Already have an account?" : "Need a new account?"}{" "}
        <button
          type="button"
          className="font-semibold text-emerald-700 underline"
          onClick={() => setAuthMode((prev) => (prev === "signup" ? "login" : "signup"))}
        >
          {authMode === "signup" ? "Login" : "Create account"}
        </button>
      </p>
    </section>
  );
};

export default Login;
