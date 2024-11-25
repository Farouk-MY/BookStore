import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setMessage('');
      await loginUser(data.email, data.password);
      navigate('/');
    } catch (error) {
      setMessage('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      setMessage('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="w-full max-w-screen-lg mx-auto flex bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Left side: Form */}
        <div className="w-full sm:w-1/2 px-8 py-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Welcome Back!</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                           transition duration-200"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="••••••••"
                    className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                             transition duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Error Message */}
              {message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm text-center"
                >
                  {message}
                </motion.p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg
                         transition duration-200 flex items-center justify-center
                         ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Login'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`w-full flex items-center justify-center bg-white border-2 border-gray-300
                       hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg
                       transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <FaGoogle className="mr-2 text-xl text-red-600" />
              Continue with Google
            </button>

            {/* Register Link */}
            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-yellow-600 hover:text-yellow-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="hidden sm:block w-1/2 relative bg-gradient-to-br from-yellow-500 to-purple-600">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <img
            src="assets/bee2.jpg"
            alt="Login Illustration"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
