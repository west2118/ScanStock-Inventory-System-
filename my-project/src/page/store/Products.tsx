// ProductsPage.jsx
import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Heart,
  Star,
  Eye,
  SlidersHorizontal,
  X,
  Cpu,
  Monitor,
  Laptop,
  Package,
  Mouse,
  Wifi,
  Headphones,
  Grid3x3,
  LayoutList,
  Check,
  User,
} from "lucide-react";

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 150000 });
  const [sortBy, setSortBy] = useState("featured");

  // Categories
  const categories = [
    { id: "all", name: "All Products", count: 156 },
    { id: "computers", name: "Computers", count: 45 },
    { id: "laptops", name: "Laptops", count: 32 },
    { id: "components", name: "Components", count: 78 },
    { id: "monitors", name: "Monitors", count: 28 },
    { id: "accessories", name: "Accessories", count: 56 },
    { id: "networking", name: "Networking", count: 24 },
    { id: "peripherals", name: "Peripherals", count: 43 },
  ];

  // Brands
  const brands = [
    { id: "asus", name: "ASUS", count: 45 },
    { id: "msi", name: "MSI", count: 38 },
    { id: "gigabyte", name: "Gigabyte", count: 32 },
    { id: "corsair", name: "Corsair", count: 28 },
    { id: "samsung", name: "Samsung", count: 25 },
    { id: "logitech", name: "Logitech", count: 22 },
    { id: "razer", name: "Razer", count: 18 },
    { id: "intel", name: "Intel", count: 15 },
    { id: "amd", name: "AMD", count: 12 },
    { id: "nzxt", name: "NZXT", count: 10 },
  ];

  // Products Data
  const products = [
    {
      id: 1,
      name: "ASUS ROG Strix RTX 4090",
      category: "components",
      brand: "asus",
      price: 124995,
      originalPrice: 139995,
      rating: 4.9,
      reviews: 128,
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=300&h=200&fit=crop",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "ASUS ROG Zephyrus G14",
      category: "laptops",
      brand: "asus",
      price: 89995,
      originalPrice: 99995,
      rating: 4.8,
      reviews: 256,
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop",
      badge: "Sale",
    },
    {
      id: 3,
      name: 'Samsung Odyssey G7 27"',
      category: "monitors",
      brand: "samsung",
      price: 34995,
      originalPrice: 44995,
      rating: 4.7,
      reviews: 89,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop",
      badge: "Top Rated",
    },
    {
      id: 4,
      name: "Corsair Vengeance 32GB DDR5",
      category: "components",
      brand: "corsair",
      price: 8995,
      originalPrice: 10995,
      rating: 4.9,
      reviews: 312,
      stock: 45,
      image:
        "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&h=200&fit=crop",
      badge: "Hot Deal",
    },
    {
      id: 5,
      name: "Logitech G502 X Plus",
      category: "peripherals",
      brand: "logitech",
      price: 5495,
      originalPrice: 6495,
      rating: 4.9,
      reviews: 1245,
      stock: 67,
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=200&fit=crop",
      badge: "Best Seller",
    },
    {
      id: 6,
      name: "Razer BlackWidow V4 Pro",
      category: "peripherals",
      brand: "razer",
      price: 8995,
      originalPrice: 10995,
      rating: 4.8,
      reviews: 892,
      stock: 23,
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33b7f5b8?w=300&h=200&fit=crop",
      badge: "New",
    },
    {
      id: 7,
      name: "MSI MPG B650 Carbon WiFi",
      category: "components",
      brand: "msi",
      price: 15995,
      originalPrice: 18995,
      rating: 4.7,
      reviews: 156,
      stock: 18,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop",
      badge: null,
    },
    {
      id: 8,
      name: "Intel Core i9-13900K",
      category: "components",
      brand: "intel",
      price: 32995,
      originalPrice: 35995,
      rating: 4.8,
      reviews: 456,
      stock: 32,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop",
      badge: "Top Rated",
    },
    {
      id: 9,
      name: "Samsung 990 Pro 2TB NVMe",
      category: "components",
      brand: "samsung",
      price: 12995,
      originalPrice: 15995,
      rating: 4.9,
      reviews: 234,
      stock: 41,
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop",
      badge: "New",
    },
    {
      id: 10,
      name: 'LG UltraGear 32" 4K',
      category: "monitors",
      brand: "lg",
      price: 49995,
      originalPrice: 59995,
      rating: 4.6,
      reviews: 78,
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop",
      badge: "Limited Stock",
    },
    {
      id: 11,
      name: "ASUS TUF Gaming Laptop",
      category: "laptops",
      brand: "asus",
      price: 64995,
      originalPrice: 74995,
      rating: 4.7,
      reviews: 189,
      stock: 14,
      image:
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop",
      badge: "Sale",
    },
    {
      id: 12,
      name: "SteelSeries Arctis Nova Pro",
      category: "peripherals",
      brand: "steelseries",
      price: 15995,
      originalPrice: 19995,
      rating: 4.8,
      reviews: 345,
      stock: 27,
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=200&fit=crop",
      badge: null,
    },
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handleBrandToggle = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((b) => b !== brandId)
        : [...prev, brandId],
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 150000 });
    setSortBy("featured");
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span
            className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-full text-white ${
              product.badge === "Best Seller"
                ? "bg-yellow-500"
                : product.badge === "Sale"
                  ? "bg-red-500"
                  : product.badge === "New"
                    ? "bg-green-500"
                    : product.badge === "Top Rated"
                      ? "bg-blue-500"
                      : product.badge === "Hot Deal"
                        ? "bg-orange-500"
                        : "bg-purple-500"
            }`}
          >
            {product.badge}
          </span>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>
        {product.stock < 10 && (
          <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Only {product.stock} left
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">
          {product.brand.toUpperCase()}
        </p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">
            ({product.reviews.toLocaleString()})
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
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );

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
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Product Catalog
          </h1>
          <p className="text-gray-500 mt-1">
            Browse our extensive collection of computer parts and accessories
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700"
          >
            <Filter className="w-5 h-5" />
            Filter & Sort
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Smaller width */}
          <aside
            className={`lg:block w-64 flex-shrink-0 ${sidebarOpen ? "block fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden"}`}
          >
            {sidebarOpen && (
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setSidebarOpen(false)} className="p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Categories - Compact */}
            <div className="mb-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg transition-colors text-sm ${
                      selectedCategory === category.id
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-400">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brands - Compact */}
            <div className="mb-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                Brands
              </h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <label
                    key={brand.id}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-lg text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => handleBrandToggle(brand.id)}
                        className="w-3.5 h-3.5 text-blue-600 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{brand.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{brand.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range - Compact */}
            <div className="mb-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                Price Range
              </h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm"
                      placeholder="Min"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: parseInt(e.target.value) || 150000,
                        })
                      }
                      className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150000"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-1"
                />
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== "all" ||
              selectedBrands.length > 0 ||
              searchTerm ||
              priceRange.min > 0 ||
              priceRange.max < 150000) && (
              <button
                onClick={clearFilters}
                className="w-full py-1.5 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Main Content - Wider */}
          <div className="flex-1">
            {/* Active Filters */}
            {(selectedCategory !== "all" ||
              selectedBrands.length > 0 ||
              searchTerm) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory("all")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedBrands.map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {brands.find((b) => b.id === brand)?.name}
                    <button onClick={() => handleBrandToggle(brand)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    Search: {searchTerm}
                    <button onClick={() => setSearchTerm("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid - 4 columns */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative sm:w-32">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <p className="text-xs text-gray-500">
                              {product.brand.toUpperCase()}
                            </p>
                            <h3 className="font-semibold text-gray-900">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-medium">
                                  {product.rating}
                                </span>
                              </div>
                              <span className="text-xs text-gray-400">
                                ({product.reviews.toLocaleString()} reviews)
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-gray-900">
                                ₱{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                  ₱{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <button className="mt-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm">
                              <ShoppingCart className="w-3 h-3" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
