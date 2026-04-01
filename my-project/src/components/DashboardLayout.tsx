import { useState } from "react";
import Sidebar from "./Sidebar";
import { Bell, Clock, Menu, X } from "lucide-react";
import { navigation } from "../utils/constants";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setActivePage={setActivePage}
        activePage={activePage}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {navigation.find((n) => n.id === activePage)?.name ||
                      "Dashboard"}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Welcome back, Admin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
