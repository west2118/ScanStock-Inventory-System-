import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const pageConfig: Record<string, { title: string; description: string }> = {
  "/admin": {
    title: "Dashboard",
    description: "Overview of branch performance and analytics",
  },
  "/admin/products": {
    title: "Products",
    description: " Manage your product catalog",
  },
  "/admin/branches": {
    title: "Branches",
    description: "Manage branch information and operations",
  },
  "/admin/sales": {
    title: "Sales Comparison",
    description: "Compare sales performance across branches",
  },
  "/admin/inventory": {
    title: "Inventory",
    description: "Monitor stock levels and inventory movement",
  },
  "/admin/productivity": {
    title: "Employee Productivity",
    description: "Track employee performance and productivity",
  },
  "/admin/leaderboards": {
    title: "Leaderboards",
    description: "View top-performing branches and employees",
  },
  "/admin/reports": {
    title: "Reports",
    description: "Generate and analyze company performance reports",
  },
  "/admin/users": {
    title: "Users",
    description: "Manage user accounts and permissions",
  },
  "/admin/settings": {
    title: "Settings",
    description: "Configure system preferences and settings",
  },
};

const HeaderNavigation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const page = pageConfig[location.pathname] ?? {
    title: "Dashboard",
    description: "Overview of branch performance and analytics",
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <div>
              <h2 className="text-xl font-bold text-gray-900">{page.title}</h2>
              <p className="text-sm text-gray-500">{page.description}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;
