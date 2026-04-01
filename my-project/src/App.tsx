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
          <ProtectedRoute allowedRoles={["admin", "staff"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute allowedRoles={["admin", "staff"]}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="inventory"
          element={
            <ProtectedRoute allowedRoles={["admin", "staff"]}>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="scan"
          element={
            <ProtectedRoute allowedRoles={["admin", "staff"]}>
              <Scan />
            </ProtectedRoute>
          }
        />
        <Route
          path="movements"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Movements />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
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
