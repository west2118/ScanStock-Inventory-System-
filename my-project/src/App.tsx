import Login from "./page/admin/Login";
import Dashboard from "./page/admin/Dashboard";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "./components/Admin/DashboardLayout";
import Products from "./page/admin/Products";
import Inventory from "./page/admin/Inventory";
import Scan from "./page/admin/Scan";
import Movements from "./page/admin/Movements";
import Reports from "./page/admin/Reports";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import POSPage from "./page/admin/POSPage";
import TransactionsPage from "./page/admin/Transactions";
import Home from "./page/store/Home";
import ProductsPage from "./page/store/Products";
import ProductDetailsPage from "./page/store/ProductDetails";
import WishlistPage from "./page/store/Wishlist";
import CartPage from "./page/store/Cart";
import CheckoutPage from "./page/store/Checkout";
import LoginPage from "./page/Login";
import RegisterPage from "./page/Register";
import StoreLayout from "./components/store/StoreLayout";
import StockAdjustments from "./page/admin/StockAdjustments";
import OrdersPage from "./page/store/Orders";
import AdminOrdersPage from "./page/admin/Orders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<StoreLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout/:id" element={<CheckoutPage />} />
        <Route path="my-orders" element={<OrdersPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
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
          path="orders"
          element={
            <ProtectedRoute allowedRoles={["admin", "branch_manager", "staff"]}>
              <AdminOrdersPage />
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
          path="stock-adjustments"
          element={
            <ProtectedRoute allowedRoles={["admin", "branch_manager", "staff"]}>
              <StockAdjustments />
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
