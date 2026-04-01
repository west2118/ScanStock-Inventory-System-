import { Package, LogOut, MenuIcon } from "lucide-react";
import { navigation } from "../utils/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { capitalizeFirst } from "../utils/utils";
import { toast } from "react-toastify";

const Sidebar = ({ sidebarOpen }: { sidebarOpen: any }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_PATH = `/${user?.role}`;

  const filteredMenu = navigation
    .map((item) => {
      // If normal item → check its roles
      if (item.roles?.includes(user?.role ?? "")) {
        return item;
      }

      return null;
    })
    .filter(Boolean);

  const handleLogout = async () => {
    await logout();

    navigate("/login");
    toast.success("Logout successfully!");
  };

  return (
    <aside
      className={`
    flex flex-col fixed lg:sticky top-0 left-0 z-30
    w-64 h-screen bg-white shadow-lg
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
        <div className="bg-blue-500 p-2 rounded-xl">
          <Package size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">ScanStock</h1>
          <p className="text-xs text-gray-500">Inventory System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {filteredMenu.map((item) => {
          const Icon = item?.icon ?? MenuIcon;

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
              key={item?.name}
              className={`
          w-full flex items-center gap-3 px-4 py-3 rounded-lg
          transition-all duration-200 group
          ${
            isActive
              ? "bg-blue-100 text-blue-600 shadow-md"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }
        `}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item?.name}</span>

              {isActive && (
                <div className="ml-auto w-1 h-6 bg-blue-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="flex items-center mt-auto p-4 border-t border-gray-200 gap-3">
        {!user ? (
          <div className="flex items-center gap-3 flex-1 min-w-0 animate-pulse">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {capitalizeFirst(user?.role ?? "")} User
              </p>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
