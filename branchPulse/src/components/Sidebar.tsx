import {
  LayoutDashboard,
  Store,
  TrendingUp,
  Package,
  Users,
  Trophy,
  FileText,
  Bell,
  Settings,
  BarChart3,
  LogOut,
  Users2,
  Box,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { capitalizeFirst } from "../lib/utils";

const menuItems = [
  { id: "", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Box },
  { id: "branches", label: "Branches", icon: Store },
  { id: "sales", label: "Sales Analytics", icon: TrendingUp },
  { id: "inventory", label: "Inventory Analytics", icon: Package },
  { id: "productivity", label: "Employee Productivity", icon: Users },
  { id: "leaderboards", label: "Leaderboards", icon: Trophy },
  { id: "users", label: "Users", icon: Users2 },
  // { id: "settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();

    navigate("/login");
    toast.success("Logged out successfully");
  };

  const BASE_PATH = `/admin`;

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-72 flex-shrink-0`}
    >
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BranchPulse</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            // ✅ build full path correctly
            const fullPath = item?.id ? `${BASE_PATH}/${item?.id}` : BASE_PATH;

            // ✅ correct active logic
            const isActive =
              item?.id === ""
                ? location.pathname === BASE_PATH
                : location.pathname.startsWith(fullPath);

            return (
              <Link
                to={fullPath}
                key={item?.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">
                  {user?.role
                    ?.replaceAll("_", " ")
                    .split(" ")
                    .map((l: string) => capitalizeFirst(l))
                    .join(" ")}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
