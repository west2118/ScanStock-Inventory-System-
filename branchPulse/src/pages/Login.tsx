import { useState } from "react";
import {
  BarChart3,
  Store,
  Package,
  Trophy,
  TrendingUp,
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();
  const { formData, handleChange } = useForm<FormData>({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const user = await login(formData);

      if (user.role === "central_admin") {
        navigate("/admin");
      } else {
        navigate("/staff/scan");
      }

      toast.success("Login successfully!");
    } catch (error: any) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Branding & Features */}
            <div className="hidden lg:flex flex-col justify-center text-white space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-xl backdrop-blur-sm">
                    <BarChart3 className="w-8 h-8 text-blue-400" />
                  </div>
                  <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    BranchPulse
                  </h1>
                </div>
                <p className="text-xl text-blue-100 font-light">
                  Multi-Branch Performance Analytics System
                </p>
                <p className="text-gray-300 max-w-md">
                  Centralized platform for monitoring and comparing computer
                  parts branch performance across all locations.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="p-2 bg-blue-500/30 rounded-lg">
                    <Store className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Branch Management</p>
                    <p className="text-sm text-gray-300">
                      Centralized control over all branch operations
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="p-2 bg-green-500/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Sales Tracking & Analytics</p>
                    <p className="text-sm text-gray-300">
                      Real-time sales monitoring and insights
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="p-2 bg-yellow-500/30 rounded-lg">
                    <Package className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Inventory Monitoring</p>
                    <p className="text-sm text-gray-300">
                      Low stock alerts and inventory optimization
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="p-2 bg-purple-500/30 rounded-lg">
                    <Trophy className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Branch Leaderboards</p>
                    <p className="text-sm text-gray-300">
                      Compare performance across all branches
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
                <div className="text-center mb-8">
                  <div className="lg:hidden flex justify-center mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-xl">
                      <BarChart3 className="w-10 h-10 text-blue-400" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-gray-300">
                    Sign in to your BranchPulse account
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="admin@branchpulse.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  {/* <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-300">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div> */}

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        Sign In
                      </>
                    )}
                  </button>
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
