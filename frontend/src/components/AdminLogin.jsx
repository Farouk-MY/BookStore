import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";
import { useNavigate } from "react-router-dom";
import { BookOpen, Key, Icon } from "lucide-react";
import { bee } from "@lucide/lab";

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const auth = response.data;
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Token has been expired!, Please login again.");
          navigate("/");
        }, 3600 * 1000);
      }
      alert("Admin Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 p-4">
      {/* Main Container with Book Design */}
      <div className="w-full max-w-4xl flex items-center gap-8">
        {/* Left Side Decorative Section */}
        <div className="hidden lg:flex flex-col items-center flex-1 space-y-6">
          <div className="relative">
            <div className="absolute -inset-1">
              <div className="w-full h-full mx-auto rotate-3 bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 blur-lg opacity-30"></div>
            </div>
            <div className="relative w-64 h-80 bg-white rounded-r-lg shadow-xl transform -rotate-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-white">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <BookOpen className="w-16 h-16 text-amber-700 mb-4" />
                  <h3 className="text-xl font-serif text-amber-900">
                    Welcome to
                  </h3>
                  <h2 className="text-2xl font-bold font-serif text-amber-950">
                    The Bee Store
                  </h2>
                  <p className="mt-4 text-amber-800 italic">
                    "There is no friend as loyal as a book"
                  </p>
                  <div className="absolute bottom-4 left-4">
                    <Icon
                      iconNode={bee}
                      className="w-6 h-6 text-amber-600 opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Login Form */}
        <div className="flex-1 bg-white rounded-xl shadow-xl p-8 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-bl-full opacity-50"></div>

          <div className="relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-amber-900">
                Admin Portal
              </h2>
              <p className="text-amber-600 mt-2">
                Manage your bookstore with ease
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-amber-700 mb-2">
                  Username
                </label>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  name="username"
                  id="username"
                  className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all bg-amber-50/50 placeholder-amber-400"
                  placeholder="Enter your username"
                />
                <Icon
                  iconNode={bee}
                  className="absolute right-3 top-1/2 transform -translate-y-1/8 w-5 h-5 text-amber-400"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-amber-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    name="password"
                    id="password"
                    className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all bg-amber-50/50 placeholder-amber-400"
                    placeholder="Enter your password"
                  />
                  <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                </div>
              </div>

              {/* Error Message */}
              {message && (
                <div className="h-5">
                  <p className="text-red-500 text-sm">{message}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                Access Dashboard
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-amber-600">
                ©2025 Book Store. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
