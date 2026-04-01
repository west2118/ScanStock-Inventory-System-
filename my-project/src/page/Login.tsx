// Login.jsx - Clean Login Page with Proper Spacing
import { useState } from "react";
import { Barcode, Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { toast } from "react-toastify";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const { formData, handleChange } = useForm<FormData>({
    username: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const user = await login(formData);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/staff/scan");
      }

      toast.success("Login successfully!");
    } catch (error: any) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {" "}
          <div className="flex justify-center mb-4">
            <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-3 rounded-2xl shadow-lg">
              <Barcode size={36} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Sign in to your account
          </p>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                placeholder="Email address"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                    className="text-gray-400 hover:text-gray-600"
                  />
                ) : (
                  <Eye
                    size={18}
                    className="text-gray-400 hover:text-gray-600"
                  />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            {/* <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
            </div> */}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              <span>Login to Dashboard</span>
            </button>

            {/* Demo Credentials */}
            <div className="text-center pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                <Barcode size={14} className="text-gray-500" />
                <span className="text-xs text-gray-500">
                  ScanStock Inventory System
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">Real-time inventory tracking</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
