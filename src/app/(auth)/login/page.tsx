"use client";

import InputTag from "@/components/InputTag";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const login = () => {
  const router = useRouter();

  const [error, setError] = useState<string>("");

  const [user, setUser] = useState({
    email: "",
    password: "",
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
    setError("");

    if (!user.password) {
      setError("Please enter password");
      return;
    }

    try {
      const response = await axios.post("/api/login", {
        email: user.email,
        password: user.password,
      });
      if (response.data && response.data.token) console.log(response);
      localStorage.setItem("token", response.data.token);
      router.replace("/");
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
    <>
      <Navbar />

      <section className="bg-gray-50 h-screen">
        <div className="flex flex-col items-center px-6 py-6 justify-center mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-6 md:space-y-4 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight">
                Sign in to your account!
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
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
                      className="input-box"
                      placeholder="name@example.com"
                      required
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
                  {error && <p className="text-xs text-red-500">{error}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="remember"
                      className="w-4 h-4 "
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-normal text-gray-500"
                    >
                      Remember me
                    </label>
                  </div>

                  <p className="text-sm cursor-pointer text-indigo-600 font-medium hover:underline">
                    Forget Password?
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full text-sm px-5 py-2.5 text-white font-medium rounded-lg bg-green-500 hover:bg-green-700"
                >
                  Sign in
                </button>

                <p className="text-sm font-light text-gray-500">
                  Don't have an account yet?{" "}
                  <Link
                    href="/register"
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default login;
