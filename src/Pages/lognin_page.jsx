import React, { useState } from "react";
import { Link } from "react-router-dom";
import logMinga from "../assets/log_minga.jpg";
import backgroundLogin from "../assets/Background_lognin.jpeg";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica de login con Redux
  };

  return (
    <div className="relative min-h-screen flex">
      <div className="absolute inset-0 bg-gray-100 z-0"></div>
      <div className="relative z-10 flex w-full min-h-screen">
        <div className="hidden lg:flex lg:w-1/2">
          <div
            className="w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundLogin})` }}
          ></div>
        </div>

        {/* Login Form Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img src={logMinga} alt="Minga Logo" className="h-12" />
            </div>

            <h2 className="text-3xl font-bold text-center mb-2">Welcome back!</h2>
            <p className="text-gray-600 text-center mb-8">
              Discover manga, manhua and manhwa, track your progress, have fun,
              read manga.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="brianmitchell@gmail.com"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                Sign in
              </button>

              {/* Google Sign In Button */}
              <button
                type="button"
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <svg viewBox="0 0 48 48" className="h-5 w-5">
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                Sign in with Google
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600">
                you don't have an account yet?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </Link>
              </p>

              {/* Home Page Link */}
              <div className="text-center">
                <Link
                  to="/home"
                  className="text-indigo-600 hover:text-indigo-500 text-sm"
                >
                  Go back to home page
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;