import {
  ChevronDown,
  Cpu,
  Heart,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white/10 p-2 rounded-lg">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">EasyPC</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full h-11 pl-12 pr-4 rounded-lg border border-white/20 bg-white text-gray-900"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5 shrink-0">
              <Link to="wishlist">
                <Heart className="w-5 h-5 text-white cursor-pointer" />
              </Link>
              <Link to="cart" className="relative">
                <ShoppingCart className="w-5 h-5 text-white cursor-pointer" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Link>
              <Link to="login">
                <User className="w-5 h-5 text-white cursor-pointer" />
              </Link>
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
