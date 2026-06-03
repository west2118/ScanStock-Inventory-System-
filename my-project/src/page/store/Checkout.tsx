// CheckoutPage.jsx
import React, { useState } from "react";
import {
  Truck,
  CreditCard,
  Package,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  User,
  Building,
  Calendar,
  Clock,
  Wallet,
  Banknote,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
  Edit,
  Home,
  Briefcase,
  Plus,
  X,
  ChevronDown,
  ShoppingCart,
  Heart,
  Search,
  Cpu,
} from "lucide-react";

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Cart Summary Data
  const cartItems = [
    {
      id: 1,
      name: "ASUS ROG Strix RTX 4090 OC",
      brand: "ASUS",
      price: 124995,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Intel Core i9-13900K",
      brand: "Intel",
      price: 32995,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Samsung 990 Pro 2TB",
      brand: "Samsung",
      price: 12995,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop",
    },
  ];

  // Shipping Address Form
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    saveAddress: false,
  });

  // Delivery Methods
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const deliveryMethods = [
    {
      id: "standard",
      name: "Standard Delivery",
      days: "3-5 business days",
      price: 0,
      minOrder: 0,
    },
    {
      id: "express",
      name: "Express Delivery",
      days: "1-2 business days",
      price: 299,
      minOrder: 0,
    },
    {
      id: "pickup",
      name: "Store Pickup",
      days: "Same day pickup",
      price: 0,
      minOrder: 0,
    },
  ];

  // Payment Methods
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const paymentMethods = [
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: Banknote,
      description: "Pay when you receive the item",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, Amex",
    },
    { id: "gcash", name: "GCash", icon: Wallet, description: "Pay via GCash" },
  ];

  // Saved Addresses
  const savedAddresses = [
    {
      id: 1,
      name: "Home",
      address: "123 Tech Avenue, Makati City",
      isDefault: true,
    },
    {
      id: 2,
      name: "Office",
      address: "456 Digital Hub, BGC Taguig",
      isDefault: false,
    },
  ];

  const [showAddressForm, setShowAddressForm] = useState(true);
  const [selectedSavedAddress, setSelectedSavedAddress] = useState(null);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = deliveryMethod === "express" ? 299 : 0;
  const total = subtotal + shippingCost;

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStepStatus = (step) => {
    if (currentStep > step) return "completed";
    if (currentStep === step) return "current";
    return "pending";
  };

  const StepIndicator = ({ step, title, status }) => {
    return (
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <div
            className={`
            w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
            ${
              status === "completed"
                ? "bg-green-600 text-white"
                : status === "current"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-400"
            }
          `}
          >
            {status === "completed" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              step
            )}
          </div>
          <span
            className={`
            text-xs mt-2 whitespace-nowrap
            ${status === "current" ? "text-gray-900 font-medium" : "text-gray-400"}
          `}
          >
            {title}
          </span>
        </div>
        {step < 4 && (
          <div
            className={`
            w-16 h-px mx-2
            ${status === "completed" ? "bg-green-600" : "bg-gray-200"}
          `}
          />
        )}
      </div>
    );
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-500 mb-6">
              Thank you for your order. You will receive a confirmation email
              shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-600">
                Order #:{" "}
                <span className="font-medium text-gray-900">
                  ORD-2024-001234
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Estimated Delivery:{" "}
                <span className="font-medium text-gray-900">
                  March 25-27, 2024
                </span>
              </p>
            </div>
            <button className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <p className="text-sm text-gray-500 mt-1">Complete your purchase</p>
        </div>

        {/* Step Indicators */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-center">
            <StepIndicator
              step={1}
              title="Shipping"
              status={getStepStatus(1)}
            />
            <StepIndicator
              step={2}
              title="Delivery"
              status={getStepStatus(2)}
            />
            <StepIndicator step={3} title="Payment" status={getStepStatus(3)} />
            <StepIndicator step={4} title="Review" status={getStepStatus(4)} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Address */}
            <div
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 ${currentStep !== 1 && "opacity-60"}`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Shipping Address
                  </h2>
                </div>
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 1 ? (
                <div>
                  {/* Saved Addresses */}
                  {savedAddresses.length > 0 && (
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Saved Address
                      </label>
                      <div className="space-y-2">
                        {savedAddresses.map((addr) => (
                          <label
                            key={addr.id}
                            className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                          >
                            <input
                              type="radio"
                              name="savedAddress"
                              checked={selectedSavedAddress?.id === addr.id}
                              onChange={() => setSelectedSavedAddress(addr)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">
                                  {addr.name}
                                </span>
                                {addr.isDefault && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {addr.address}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-400">
                            or
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Address Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingAddress.firstName}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingAddress.lastName}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingAddress.email}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        placeholder="0912 345 6789"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={shippingAddress.address}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        placeholder="123 Tech Avenue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        placeholder="Makati City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Province *
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={shippingAddress.province}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        placeholder="Metro Manila"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                        placeholder="1234"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="saveAddress"
                        checked={shippingAddress.saveAddress}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            saveAddress: e.target.checked,
                          })
                        }
                        className="rounded"
                      />
                      <span className="text-sm text-gray-600">
                        Save this address for future orders
                      </span>
                    </label>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="mt-6 w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Delivery
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  {selectedSavedAddress ? (
                    <p>{selectedSavedAddress.address}</p>
                  ) : shippingAddress.address ? (
                    <div>
                      <p>
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </p>
                      <p>
                        {shippingAddress.address}, {shippingAddress.city}
                      </p>
                      <p>
                        {shippingAddress.province}, {shippingAddress.zipCode}
                      </p>
                      <p>{shippingAddress.phone}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400">No address added yet</p>
                  )}
                </div>
              )}
            </div>

            {/* Step 2: Delivery Method */}
            <div
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 ${currentStep !== 2 && "opacity-60"}`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <Truck className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Delivery Method
                  </h2>
                </div>
                {currentStep > 2 && (
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 2 ? (
                <div>
                  <div className="space-y-3">
                    {deliveryMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                          deliveryMethod === method.id
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="deliveryMethod"
                            value={method.id}
                            checked={deliveryMethod === method.id}
                            onChange={(e) => setDeliveryMethod(e.target.value)}
                            className="w-4 h-4 text-gray-900"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {method.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {method.days}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {method.price === 0 ? (
                            <span className="text-sm text-green-600">Free</span>
                          ) : (
                            <span className="text-sm font-medium text-gray-900">
                              ₱{method.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handlePrevStep}
                      className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="flex-1 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  <p>
                    {deliveryMethods.find((m) => m.id === deliveryMethod)?.name}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {deliveryMethods.find((m) => m.id === deliveryMethod)?.days}
                  </p>
                </div>
              )}
            </div>

            {/* Step 3: Payment Method */}
            <div
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 ${currentStep !== 3 && "opacity-60"}`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Payment Method
                  </h2>
                </div>
                {currentStep > 3 && (
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 3 ? (
                <div>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <label
                          key={method.id}
                          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? "border-gray-900 bg-gray-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={paymentMethod === method.id}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-4 h-4 text-gray-900"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <Icon className="w-5 h-5 text-gray-600" />
                                <p className="font-medium text-gray-900">
                                  {method.name}
                                </p>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {method.description}
                              </p>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handlePrevStep}
                      className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="flex-1 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      Review Order
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  <p>
                    {paymentMethods.find((m) => m.id === paymentMethod)?.name}
                  </p>
                </div>
              )}
            </div>

            {/* Step 4: Review Order */}
            {currentStep === 4 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Review Order
                  </h2>
                </div>

                {/* Order Items Summary */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Items</h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 py-2 border-b border-gray-100"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">{item.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ₱{item.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Info Summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Shipping Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedSavedAddress?.address ||
                      `${shippingAddress.address}, ${shippingAddress.city}`}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {deliveryMethods.find((m) => m.id === deliveryMethod)?.name}
                  </p>
                </div>

                {/* Payment Summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Payment Method
                  </h3>
                  <p className="text-sm text-gray-600">
                    {paymentMethods.find((m) => m.id === paymentMethod)?.name}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="text-base font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">
                    ₱{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-900">
                    {shippingCost === 0
                      ? "Free"
                      : `₱${shippingCost.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ₱{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Secure checkout. Your info is protected.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
