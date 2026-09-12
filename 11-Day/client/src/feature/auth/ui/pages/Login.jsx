import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../../../context/authContext";

const Login = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold text-white">Welcome Back</h1>

        <p className="mb-8 text-sm text-slate-400">Login to your account</p>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
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
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-white pl-20 pt-5 text-sm">
          you don't have a account?{" "}
          <span className="text-blue-500">
            <NavLink to={"/register"}>Register</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
