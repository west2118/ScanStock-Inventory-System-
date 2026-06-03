import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderNavigation from "./HeaderNavigation";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderNavigation />

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
