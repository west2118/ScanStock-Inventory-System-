import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Products from "./page/Products";
import Inventory from "./page/Inventory";
import Scan from "./page/Scan";
import Movements from "./page/Movements";
import Reports from "./page/Reports";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRedirect from "./components/RoleRedirect";
import POSPage from "./page/POSPage";
import TransactionsPage from "./page/Transactions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route index element={<RoleRedirect />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route
        path="/:role"
        element={
          <ProtectedRoute allowedRoles={["admin", "branch_manager", "staff"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <ProtectedRoute allowedRoles={["admin", "branch_manager"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute allowedRoles={["admin", "branch_manager", "staff"]}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="pos"
          element={
            <ProtectedRoute allowedRoles={["admin", "branch_manager", "staff"]}>
              <POSPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="transactions"
          element={
            <ProtectedRoute allowedRoles={["admin", "branch_manager", "staff"]}>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="inventory"
          element={
            <ProtectedRoute allowedRoles={["admin", "branch_manager", "staff"]}>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="scan"
          element={
            <ProtectedRoute allowedRoles={["admin", "branch_manager", "staff"]}>
              <Scan />
            </ProtectedRoute>
          }
        />
        <Route
          path="movements"
          element={
            <ProtectedRoute allowedRoles={["admin", "branch_manager"]}>
              <Movements />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports"
          element={
            <ProtectedRoute allowedRoles={["admin", "branch_manager"]}>
              <Reports />
            </ProtectedRoute>
          }
        />
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
