"use client";

import InputTag from "@/components/InputTag";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const register = () => {
  const router = useRouter();

  const [passError, setPassError] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleInput = (e: any) => {
    const name = e.target.name;
    setUser({
      ...user,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setPassError("");
    setError("");

    if (!user.password) {
      setPassError("Please enter the password.");
      return;
    }
    if (user.password !== user.confirmPassword) {
      setError("Password do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/register", {
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        gender: user.gender,
      });
      if (response.data && response.data.token) {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        router.replace("/");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured!");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <section className="bg-gray-50 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 md:h-screen">
          <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 sm:p-8 space-y-4 md:space-y-6">
              <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tighter">
                Create an account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Fullname
                  </label>
                  <div className="w-full bg-slate-50 border rounded-md">
                    <input
                      name="fullname"
                      value={user.fullname}
                      onChange={handleInput}
                      type="text"
                      required
                      className="input-box"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <div className="w-full bg-slate-50 border rounded-md">
                    <input
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      type="text"
                      required
                      className="input-box"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <InputTag
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    label="Password"
                  />
                  {passError && (
                    <p className="text-xs text-red-500">{passError}</p>
                  )}
                </div>

                <div>
                  <InputTag
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleInput}
                    label="Confirm Password"
                  />
                  {error && <p className="text-xs text-red-500">{error}</p>}
                </div>

                <div className="flex items-center mb-4 gap-2">
                  <input
                    name="gender"
                    value="Male"
                    onChange={handleInput}
                    type="radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    required
                  />
                  <label className="text-sm font-medium text-gray-900">
                    Male
                  </label>
                  <input
                    name="gender"
                    value="Female"
                    onChange={handleInput}
                    type="radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    required
                  />
                  <label className="text-sm font-medium text-gray-900">
                    Female
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full text-sm px-5 py-2.5 text-white font-medium rounded-lg bg-green-500 hover:bg-green-700"
                >
                  Register
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default register;
