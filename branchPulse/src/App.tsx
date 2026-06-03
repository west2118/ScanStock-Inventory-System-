import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginPage from "./pages/Login";
import RoleRedirect from "./components/RoleRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import BranchManagementPage from "./pages/Branches";
import CompanyPerformanceReportsPage from "./pages/Reports";
import UserManagementPage from "./pages/Users";
import SystemSettingsPage from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import SalesComparison from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Employees from "./pages/Employees";
import Leaderboard from "./pages/Leaderboard";
import ProductsPage from "./pages/Products";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RoleRedirect />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["central_admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="branches" element={<BranchManagementPage />} />
        <Route path="sales" element={<SalesComparison />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="productivity" element={<Employees />} />
        <Route path="leaderboards" element={<Leaderboard />} />
        <Route path="reports" element={<CompanyPerformanceReportsPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="settings" element={<SystemSettingsPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
    </>,
  ),
);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
