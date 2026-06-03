// LoginPage.jsx
import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  User,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Cpu,
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login attempted:", { email, password });
    }, 1000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
    }, 1000);
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="max-w-7xl mx-auto px-6">
              <div className="h-16 flex items-center justify-between gap-6">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Cpu className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">EasyPC</span>
                </div>
                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full h-11 pl-12 pr-4 rounded-lg border border-white/20 bg-white text-gray-900"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                  <Heart className="w-5 h-5 text-white cursor-pointer" />
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5 text-white cursor-pointer" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      3
                    </span>
                  </div>
                  <User className="w-5 h-5 text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto">
              <nav className="h-12 flex items-center justify-center gap-8 text-sm uppercase">
                <a
                  href="#"
                  className="text-black hover:text-blue-600 transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="flex items-center gap-1 text-black hover:text-blue-600 transition-colors"
                >
                  Products <ChevronDown className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="text-black hover:text-blue-600 transition-colors"
                >
                  Desktop
                </a>
                <a
                  href="#"
                  className="text-black hover:text-blue-600 transition-colors"
                >
                  Laptop
                </a>
                <a
                  href="#"
                  className="text-black hover:text-blue-600 transition-colors"
                >
                  Build a PC
                </a>
                <a
                  href="#"
                  className="text-black hover:text-blue-600 transition-colors"
                >
                  Brands
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Reset Password Content */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 min-h-[calc(100vh-128px)]">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl shadow-lg mb-4">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">EasyPC</h1>
              <p className="text-sm text-gray-500 mt-1">Reset your password</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              {!resetSent ? (
                <form onSubmit={handleResetPassword}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      We'll send you a link to reset your password
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="w-full mt-3 py-3 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    Back to Login
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Check your email
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    We've sent a password reset link to {resetEmail}
                  </p>
                  <button
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetSent(false);
                      setResetEmail("");
                    }}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                  >
                    Return to Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-7xl mx-auto px-6">
            <div className="h-16 flex items-center justify-between gap-6">
              {/* Logo */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Cpu className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">EasyPC</span>
              </div>

              {/* Search */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full h-11 pl-12 pr-4 rounded-lg border border-white/20 bg-white text-gray-900"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-5 shrink-0">
                <Heart className="w-5 h-5 text-white cursor-pointer" />
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-white cursor-pointer" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </div>
                <User className="w-5 h-5 text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto">
            <nav className="h-12 flex items-center justify-center gap-8 text-sm uppercase">
              <a
                href="#"
                className="text-black hover:text-blue-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="flex items-center gap-1 text-black hover:text-blue-600 transition-colors"
              >
                Products <ChevronDown className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-black hover:text-blue-600 transition-colors"
              >
                Desktop
              </a>
              <a
                href="#"
                className="text-black hover:text-blue-600 transition-colors"
              >
                Laptop
              </a>
              <a
                href="#"
                className="text-black hover:text-blue-600 transition-colors"
              >
                Build a PC
              </a>
              <a
                href="#"
                className="text-black hover:text-blue-600 transition-colors"
              >
                Brands
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Login Content */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 min-h-[calc(100vh-128px)]">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Hero Section */}
            <div className="hidden lg:flex flex-col justify-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl shadow-lg mb-6">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome Back to <span className="text-gray-900">EasyPC</span>
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Your one-stop shop for premium computer parts and gaming gear.
                  Sign in to access your account and track your orders.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>100% genuine products</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free shipping on orders ₱5,000+</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>7-day easy returns</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-400">
                  © 2024 EasyPC. All rights reserved.
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-md">
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-900 rounded-2xl shadow-lg mb-3">
                    <Cpu className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Welcome Back
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Sign in to your account
                  </p>
                </div>

                {/* Desktop Title */}
                <div className="hidden lg:block mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your credentials to continue
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-gray-400"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white text-gray-400">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#1877F2"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">Facebook</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#DB4437"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#4285F4"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#0F9D58"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">Google</span>
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <a
                      href="#"
                      className="text-gray-900 font-medium hover:underline"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
