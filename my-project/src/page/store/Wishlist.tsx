// WishlistPage.jsx
import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  Package,
  Truck,
  Shield,
  RotateCcw,
  Clock,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Share2,
  MoveRight,
  ChevronDown,
  User,
  Search,
  Cpu,
} from "lucide-react";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "ASUS ROG Strix RTX 4090 OC",
      brand: "ASUS",
      price: 124995,
      originalPrice: 139995,
      rating: 4.9,
      reviews: 128,
      stock: 15,
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Intel Core i9-13900K",
      brand: "Intel",
      price: 32995,
      originalPrice: 35995,
      rating: 4.8,
      reviews: 456,
      stock: 8,
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Samsung 990 Pro 2TB",
      brand: "Samsung",
      price: 12995,
      originalPrice: 15995,
      rating: 4.9,
      reviews: 234,
      stock: 0,
      inStock: false,
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Corsair Vengeance 32GB",
      brand: "Corsair",
      price: 8995,
      originalPrice: 10995,
      rating: 4.7,
      reviews: 312,
      stock: 25,
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&h=200&fit=crop",
    },
    {
      id: 5,
      name: "Logitech G502 X Plus",
      brand: "Logitech",
      price: 5495,
      originalPrice: 6495,
      rating: 4.9,
      reviews: 1245,
      stock: 3,
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=200&fit=crop",
    },
    {
      id: 6,
      name: "Razer BlackWidow V4",
      brand: "Razer",
      price: 8995,
      originalPrice: 10995,
      rating: 4.8,
      reviews: 892,
      stock: 0,
      inStock: false,
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33b7f5b8?w=300&h=200&fit=crop",
    },
    {
      id: 7,
      name: "MSI MPG B650 Carbon",
      brand: "MSI",
      price: 15995,
      originalPrice: 18995,
      rating: 4.7,
      reviews: 156,
      stock: 18,
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop",
    },
    {
      id: 8,
      name: "NZXT H9 Flow Case",
      brand: "NZXT",
      price: 7995,
      originalPrice: 9995,
      rating: 4.8,
      reviews: 445,
      stock: 12,
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=300&h=200&fit=crop",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showMoveToCartModal, setShowMoveToCartModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      setSelectAll(false);
    } else {
      setSelectedItems([...selectedItems, itemId]);
      if (selectedItems.length + 1 === wishlistItems.length) {
        setSelectAll(true);
      }
    }
  };

  const handleRemoveItem = (item) => {
    setItemToRemove(item);
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    setWishlistItems(
      wishlistItems.filter((item) => item.id !== itemToRemove.id),
    );
    setSelectedItems(selectedItems.filter((id) => id !== itemToRemove.id));
    setShowRemoveModal(false);
    setItemToRemove(null);
  };

  const handleRemoveSelected = () => {
    setWishlistItems(
      wishlistItems.filter((item) => !selectedItems.includes(item.id)),
    );
    setSelectedItems([]);
    setSelectAll(false);
  };

  const handleMoveToCart = (item) => {
    console.log("Moving to cart:", item);
    setShowMoveToCartModal(true);
    setTimeout(() => setShowMoveToCartModal(false), 2000);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
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
                <Heart className="w-5 h-5 text-white cursor-pointer" />
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-white cursor-pointer" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </div>
                <User className="w-5 h-5 text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto">
            <nav className="h-12 flex items-center justify-center gap-8 text-sm uppercase">
              <a
                href="#"
                className="text-black hover:text-blue-600 transition-colors"
              >
                Home
              </a>

              <a
                href="#"
                className="flex items-center gap-1 text-black hover:text-blue-600 transition-colors"
              >
                Products
                <ChevronDown className="w-4 h-4" />
              </a>

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Wishlist
              </h1>
              <p className="text-gray-500 mt-1">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "item" : "items"} saved for later
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Wishlist
              </button>
            </div>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty Wishlist State */
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-pink-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Save your favorite items here
            </p>
            <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Bulk Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-gray-900 rounded border-gray-300"
                  />
                  Select All
                </label>
                {selectedItems.length > 0 && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleMoveSelectedToCart}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Move to Cart ({selectedItems.length})
                    </button>
                    <button
                      onClick={handleRemoveSelected}
                      className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                    >
                      Remove ({selectedItems.length})
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Wishlist Items Grid - 4 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="absolute top-3 right-3 z-10 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                  </button>

                  {/* Product Image */}
                  <div className="relative pt-4 px-4">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                        <span className="text-xs font-medium text-red-600">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 pt-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      {item.brand}
                    </p>
                    <h3 className="font-medium text-gray-900 text-sm mt-1 line-clamp-2 leading-snug">
                      {item.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex items-center gap-0.5">
                        {renderStars(item.rating)}
                      </div>
                      <span className="text-xs text-gray-400 ml-1">
                        ({item.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ₱{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-2">
                          ₱{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleMoveToCart(item)}
                      disabled={!item.inStock}
                      className={`w-full mt-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        item.inStock
                          ? "bg-gray-900 text-white hover:bg-gray-800"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Products */}
            <div className="border-t border-gray-100 pt-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  You May Also Like
                </h2>
                <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {wishlistItems.slice(0, 4).map((item) => (
                  <div key={`rec-${item.id}`} className="group cursor-pointer">
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.brand}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        ₱{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Move to Cart Success Modal */}
      {showMoveToCartModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 max-w-sm mx-4 text-center">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Added to Cart
            </h3>
            <p className="text-sm text-gray-500">
              Item has been moved to your cart.
            </p>
            <button
              onClick={() => setShowMoveToCartModal(false)}
              className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {showRemoveModal && itemToRemove && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 max-w-sm mx-4">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Remove item?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Remove{" "}
              <span className="font-medium text-gray-900">
                {itemToRemove.name}
              </span>{" "}
              from your wishlist?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
