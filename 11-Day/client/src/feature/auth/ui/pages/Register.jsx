import React from "react";
import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const { handleChange, handleSumbit } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold text-white">Create Account</h1>

        <p className="mb-8 text-sm text-slate-400">Register your account</p>

        <form onSubmit={handleSumbit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Name
            </label>

            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-white pl-20 pt-5 text-sm">
          already you have a account?{" "}
          <span className="text-blue-500">
            <NavLink to={"/login"}>Login</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
