import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Chrome } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica de login con Redux
  };

  return (
    <div className="min-h-screen flex">
      {/* Background Image Side */}
      <div className="hidden lg:flex lg:w-1/2">
        <div className="w-full bg-cover bg-center bg-no-repeat" 
             style={{ backgroundImage: "url('/assets/Background_lognin.jpeg')" }}>
        </div>
      </div>

      {/* Login Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/assets/log_minga.jpg" alt="Minga Logo" className="h-12" />
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Welcome back!</h2>
          <p className="text-gray-600 text-center mb-8">
            Discover manga, manhua and manhwa, track your progress,
            have fun, read manga.
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
              <label className="text-sm font-medium text-gray-700">Password</label>
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
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign in
            </button>

            {/* Google Sign In Button */}
            <button
              type="button"
              className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Chrome size={20} />
              Sign in with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              you don't have an account yet?{' '}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>

            {/* Home Page Link */}
            <div className="text-center">
              <Link to="/home" className="text-indigo-600 hover:text-indigo-500 text-sm">
                Go back to home page
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;