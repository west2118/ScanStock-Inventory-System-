// CartPage.jsx - Professional Shopping Cart
import React, { useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  Heart,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  RotateCcw,
  Clock,
  X,
  AlertCircle,
  ChevronRight,
  CreditCard,
  Wallet,
  Building2,
  Package,
  Lock,
  ChevronDown,
  User,
  Search,
  Cpu,
} from "lucide-react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "ASUS ROG Strix RTX 4090 OC Edition 24GB GDDR6X",
      brand: "ASUS",
      price: 124995,
      originalPrice: 139995,
      quantity: 1,
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=300&h=200&fit=crop",
      sku: "RTX4090-OC-24G",
    },
    {
      id: 2,
      name: "Intel Core i9-13900K Processor 24 Cores up to 5.8GHz",
      brand: "Intel",
      price: 32995,
      originalPrice: 35995,
      quantity: 1,
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop",
      sku: "BX8071513900K",
    },
    {
      id: 3,
      name: "Samsung 990 Pro 2TB NVMe M.2 SSD",
      brand: "Samsung",
      price: 12995,
      originalPrice: 15995,
      quantity: 1,
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop",
      sku: "MZ-V9P2T0BW",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);
  const shippingFee = subtotal > 5000 ? 0 : 150;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shippingFee - discount;

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item,
      ),
    );
  };

  const handleRemoveItem = (item) => {
    setItemToRemove(item);
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id));
    setShowRemoveModal(false);
    setItemToRemove(null);
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setPromoApplied(true);
    }
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
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <span className="text-sm text-gray-400 ml-auto">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center py-16">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Looks like you haven't added any items yet
            </p>
            <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Column */}
            <div className="lg:col-span-2">
              {/* Cart Items Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-xs text-gray-400 pb-3 border-b border-gray-100 mb-4">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-xs text-gray-400 mb-0.5">
                              {item.brand}
                            </p>
                            <h3 className="font-medium text-gray-900 text-sm md:text-base">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">
                              SKU: {item.sku}
                            </p>

                            {/* Mobile Price Display */}
                            <div className="md:hidden mt-2 flex items-center gap-2">
                              <span className="text-base font-semibold text-gray-900">
                                ₱{item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                  ₱{item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Desktop Price */}
                          <div className="hidden md:block text-center w-24">
                            <span className="text-sm font-medium text-gray-900">
                              ₱{item.price.toLocaleString()}
                            </span>
                            {item.originalPrice && (
                              <div className="text-xs text-gray-400 line-through mt-0.5">
                                ₱{item.originalPrice.toLocaleString()}
                              </div>
                            )}
                          </div>

                          {/* Quantity Selector */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5 text-gray-600" />
                              </button>
                              <span className="w-10 text-center text-sm text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5 text-gray-600" />
                              </button>
                            </div>

                            {/* Mobile Subtotal */}
                            <div className="md:hidden text-right min-w-[80px]">
                              <span className="text-sm font-semibold text-gray-900">
                                ₱{(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Desktop Subtotal & Actions */}
                          <div className="hidden md:flex flex-col items-end gap-2 w-28">
                            <span className="text-sm font-semibold text-gray-900">
                              ₱{(item.price * item.quantity).toLocaleString()}
                            </span>
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Mobile Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="md:hidden text-gray-400 hover:text-red-500 transition-colors absolute right-4 top-4"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="mt-6">
                <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1">
                  ← Continue Shopping
                </button>
              </div>
            </div>

            {/* Order Summary - Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
                <h3 className="text-base font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                  Order Summary
                </h3>

                {/* Subtotal */}
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">
                    ₱{subtotal.toLocaleString()}
                  </span>
                </div>

                {/* Savings */}
                {totalSavings > 0 && (
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-green-600">Savings</span>
                    <span className="text-green-600">
                      -₱{totalSavings.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Shipping */}
                <div className="border-t border-gray-100 pt-3 mb-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-gray-900">
                      {shippingFee === 0
                        ? "Free"
                        : `₱${shippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Free shipping on orders ₱5,000+
                  </p>
                </div>

                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Gift card or discount code"
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={promoApplied}
                      className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-green-600 mt-2">
                      ✓ 10% discount applied
                    </p>
                  )}
                </div>

                {/* Discount */}
                {discount > 0 && (
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-green-600">Discount (10%)</span>
                    <span className="text-green-600">
                      -₱{discount.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Total */}
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₱{total.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 text-center">
                    Taxes included. Shipping calculated at checkout.
                  </p>
                </div>

                {/* Checkout Button */}
                <button className="w-full mt-5 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <Lock className="w-4 h-4" />
                  Checkout Securely
                </button>

                {/* Payment Methods */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 text-center mb-3">
                    Secure payment with
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <Wallet className="w-5 h-5 text-gray-400" />
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Standard Delivery: 3-5 business days</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>7-day easy returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield className="w-3.5 h-3.5" />
                    <span>100% genuine products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Remove Confirmation Modal */}
      {showRemoveModal && itemToRemove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Remove item?
              </h3>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to remove{" "}
              <span className="font-medium text-gray-900">
                {itemToRemove.name}
              </span>{" "}
              from your cart?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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

export default CartPage;
