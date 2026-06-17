import {
  ChevronDown,
  Cpu,
  Heart,
  Package,
  Search,
  ShoppingCart,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/utils";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: wishlistData = { count: 0 } } = useQuery({
    queryKey: ["wishlist-count"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/wishlist/count`),
    enabled: !!user,
  });

  const { data: cartData = { count: 0 } } = useQuery({
    queryKey: ["cart-count"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/carts/count`),
    enabled: !!user,
  });

  const { data: activeOrders = { count: 0 } } = useQuery({
    queryKey: ["orders-count"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/orders/my-orders/count`),
    enabled: !!user,
  });

  const activeOrdersCount = activeOrders.count;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/login");
  };
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-18 flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white/10 p-2 rounded-lg">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">ByteForge</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full h-10 pl-12 pr-4 rounded-full border border-white/20 bg-white text-gray-900"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5 shrink-0">
              <Link to="wishlist" className="relative">
                <Heart className="w-5 h-5 text-white cursor-pointer" />
                {user && wishlistData.count > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {wishlistData.count}
                  </span>
                )}
              </Link>
              <Link to="cart" className="relative">
                <ShoppingCart className="w-5 h-5 text-white cursor-pointer" />
                {user && cartData.count > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {cartData.count}
                  </span>
                )}
              </Link>
              {user && (
                <Link to="my-orders" className="relative">
                  <Package className="w-5 h-5 text-white cursor-pointer" />
                  {activeOrdersCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {activeOrdersCount}
                    </span>
                  )}
                </Link>
              )}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 text-white hover:text-gray-200 focus:outline-none"
                  >
                    <User className="w-5 h-5 cursor-pointer" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="login">
                  <User className="w-5 h-5 text-white cursor-pointer" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <nav className="h-12 flex items-center justify-center gap-8 text-sm uppercase">
            <Link
              to="/"
              className="text-black hover:text-blue-600 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="flex items-center gap-1 text-black hover:text-blue-600 transition-colors"
            >
              Products
              <ChevronDown className="w-4 h-4" />
            </Link>

            <a
              href="#"
              className="text-black hover:text-blue-600 transition-colors"
            >
              Desktop
            </a>

            <a
              href="#"
              className="text-black hover:text-blue-600 transition-colors"
            >
              Laptop
            </a>

            <a
              href="#"
              className="text-black hover:text-blue-600 transition-colors"
            >
              Build a PC
            </a>

            <a
              href="#"
              className="text-black hover:text-blue-600 transition-colors"
            >
              Brands
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
