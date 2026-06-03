import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const StoreLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default StoreLayout;
