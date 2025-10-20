import React, { useState } from "react";

const Login = () => {
  // const [state, setState] = useState("Login");
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };
  return (
    <form className="min-h-[80vh] flex items-center" action="">
      <div className="flex flex-col gap-3 m-auto items-start  p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          PLease {state === "Sign Up" ? "Sign-up" : "Login"} to book your
          appointment{" "}
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.name);
              }}
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.email);
            }}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={name}
            required
          />
        </div>
        <div className="w-full">
          <p>Passowrd</p>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.password);
            }}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={password}
            required
          />
        </div>
        <button className="bg-indigo-500 text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already Have an account?
            <span
              className="text-indigo-500 underline cursor-pointer"
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?
            <span
              className="text-indigo-500 underline cursor-pointer"
              onClick={() => {
                setState("Sign Up");
              }}
            >
              {" "}
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
