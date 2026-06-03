// ProductDetailsPage.jsx
import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Phone,
  Mail,
  Share2,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Award,
  Package,
  Cpu,
  HardDrive,
  Monitor,
  Battery,
  Wifi,
  Bluetooth,
  Zap,
  Thermometer,
  Users,
  ThumbsUp,
  Flag,
  MoreHorizontal,
  ChevronDown,
  User,
  Search,
} from "lucide-react";

const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedBranch, setSelectedBranch] = useState("all");

  // Product Gallery Images
  const productImages = [
    "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=600&h=500&fit=crop",
    "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=600&h=500&fit=crop&rotate=90",
    "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&h=500&fit=crop",
    "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=500&fit=crop",
  ];

  // Product Data
  const product = {
    id: 1,
    name: "ASUS ROG Strix RTX 4090 OC Edition 24GB GDDR6X",
    brand: "ASUS",
    sku: "RTX4090-OC-24G",
    price: 124995,
    originalPrice: 139995,
    rating: 4.9,
    reviewCount: 128,
    stock: 15,
    status: "In Stock",
    description: `The ASUS ROG Strix RTX 4090 OC Edition is the ultimate graphics card for gaming and content creation. Powered by NVIDIA's Ada Lovelace architecture, it delivers massive performance leaps in both rasterization and ray tracing.

Key highlights:
• Next-gen gaming performance with DLSS 3
• 24GB GDDR6X memory for 4K and 8K gaming
• Axial-tech fans for maximum airflow
• 3.5-slot design with vapor chamber cooling
• 0dB technology for silent operation
• Aura Sync RGB lighting with customizable effects

Whether you're gaming at 4K, streaming, or editing 4K video, the RTX 4090 provides the power you need for the most demanding tasks.`,
    specifications: {
      GPU: "NVIDIA GeForce RTX 4090",
      "CUDA Cores": "16384",
      Memory: "24GB GDDR6X",
      "Memory Interface": "384-bit",
      "Boost Clock": "2610 MHz",
      "Base Clock": "2235 MHz",
      Ports: "3x DisplayPort 1.4a, 2x HDMI 2.1",
      "Power Connectors": "1 x 16-pin",
      "Recommended PSU": "1000W",
      Dimensions: "357.6 x 149.3 x 70.1 mm",
      Technology: "PCIe 4.0",
    },
    branchAvailability: [
      {
        branch: "Makati City",
        stock: 5,
        address: "123 Tech Avenue, Makati",
        phone: "(02) 8123 4567",
      },
      {
        branch: "Quezon City",
        stock: 3,
        address: "456 Digital Hub, Quezon City",
        phone: "(02) 8765 4321",
      },
      {
        branch: "Cebu City",
        stock: 7,
        address: "789 IT Park, Cebu City",
        phone: "(032) 123 4567",
      },
      {
        branch: "Davao City",
        stock: 0,
        address: "321 Cyber Zone, Davao City",
        phone: "(082) 765 4321",
      },
    ],
    features: [
      "Ray Tracing Cores",
      "DLSS 3 Technology",
      "0dB Silent Operation",
      "Dual BIOS",
      "Vapor Chamber Cooling",
      "Aura Sync RGB",
    ],
    whatInBox: [
      "ROG Strix RTX 4090 Graphics Card",
      "ROG Graphics Card Holder",
      "ROG Velcro Cable Tie",
      "Collection Card",
      "Speedsetup Manual",
    ],
  };

  // Reviews Data
  const reviews = [
    {
      id: 1,
      user: "John Reyes",
      avatar: "JR",
      rating: 5,
      date: "2024-01-15",
      title: "Incredible performance!",
      content:
        "This card is an absolute beast. Upgraded from a 3080 and the difference is night and day. 4K gaming with max settings no problem. Runs surprisingly cool considering the power.",
      helpful: 45,
      verified: true,
    },
    {
      id: 2,
      user: "Maria Santos",
      avatar: "MS",
      rating: 5,
      date: "2024-01-10",
      title: "Worth every peso",
      content:
        "Yes it's expensive, but for content creation and gaming, nothing else comes close. Render times are cut in half. Highly recommended for professionals.",
      helpful: 32,
      verified: true,
    },
    {
      id: 3,
      user: "Mike Chen",
      avatar: "MC",
      rating: 4,
      date: "2024-01-05",
      title: "Great card but huge!",
      content:
        "Performance is amazing but make sure your case can fit this monster. Check dimensions before buying. Other than that, perfect.",
      helpful: 28,
      verified: true,
    },
  ];

  // Related Products
  const relatedProducts = [
    {
      id: 2,
      name: "ASUS ROG Strix RTX 4080 OC",
      price: 89995,
      originalPrice: 99995,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=200&h=150&fit=crop",
    },
    {
      id: 3,
      name: "MSI RTX 4090 Suprim X",
      price: 129995,
      originalPrice: 139995,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=200&h=150&fit=crop",
    },
    {
      id: 4,
      name: "Gigabyte RTX 4090 Gaming OC",
      price: 119995,
      originalPrice: 129995,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=200&h=150&fit=crop",
    },
    {
      id: 5,
      name: "Intel Core i9-13900K Processor",
      price: 32995,
      originalPrice: 35995,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&h=150&fit=crop",
    },
  ];

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
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
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <a href="/" className="text-gray-500 hover:text-blue-600">
            Home
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="/products" className="text-gray-500 hover:text-blue-600">
            Products
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <a
            href="/products?category=components"
            className="text-gray-500 hover:text-blue-600"
          >
            Components
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium">
            ASUS ROG Strix RTX 4090
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden mb-4 border border-gray-200">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-xl overflow-hidden transition-all ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Brand & SKU */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-600 font-medium text-sm">
                {product.brand}
              </span>
              <span className="text-gray-400 text-xs">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {product.rating}
              </span>
              <span className="text-sm text-gray-500">
                ({product.reviewCount} reviews)
              </span>
              <button className="text-blue-600 text-sm hover:underline">
                Write a review
              </button>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₱{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ₱{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded-full">
                  Save ₱
                  {(product.originalPrice - product.price).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
              {product.stock > 0 ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-700 font-medium">In Stock</span>
                  <span className="text-gray-500 text-sm">
                    ({product.stock} units available)
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock} units available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl mb-6">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-green-600" />
                <span className="text-sm">Free Shipping ₱5,000+</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm">2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-orange-600" />
                <span className="text-sm">7-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-12">
          <div className="border-b border-gray-200">
            <div className="flex gap-6 px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "description"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "specifications"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("availability")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "availability"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Branch Availability
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "reviews"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Description Tab */}
            {activeTab === "description" && (
              <div>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        What's in the Box
                      </h4>
                      <ul className="space-y-2">
                        {product.whatInBox.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <Package className="w-4 h-4 text-blue-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <tr key={key} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50 w-1/3">
                            {key}
                          </td>
                          <td className="py-3 px-4 text-gray-600">{value}</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Branch Availability Tab */}
            {activeTab === "availability" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.branchAvailability.map((branch) => (
                    <div
                      key={branch.branch}
                      className="border border-gray-200 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-gray-900">
                            {branch.branch}
                          </h4>
                        </div>
                        {branch.stock > 0 ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {branch.stock} in stock
                          </span>
                        ) : (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            Out of stock
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {branch.address}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Phone className="w-4 h-4" />
                        <span>{branch.phone}</span>
                      </div>
                      {branch.stock > 0 && (
                        <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                          Pick up from this branch
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                {/* Rating Summary */}
                <div className="flex items-center gap-8 mb-8 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">
                      {product.rating}
                    </div>
                    <div className="flex items-center gap-1 my-1">
                      {renderStars(product.rating)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Based on {product.reviewCount} reviews
                    </div>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter(
                        (r) => r.rating === star,
                      ).length;
                      const percentage = (count / reviews.length) * 100;
                      return (
                        <div
                          key={star}
                          className="flex items-center gap-2 mb-1"
                        >
                          <span className="text-sm text-gray-600 w-8">
                            {star} star
                          </span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="bg-yellow-400 h-full rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500 w-8">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Write Review Button */}
                <div className="mb-6 text-right">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Write a Review
                  </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                            {review.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">
                                {review.user}
                              </span>
                              {review.verified && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-0.5">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-xs text-gray-400">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-blue-600">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {review.title}
                      </h4>
                      <p className="text-gray-600 mb-3">{review.content}</p>
                      <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-6">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">
                      {product.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ₱{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₱{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
