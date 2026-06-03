import { ShoppingCart, Heart, Star, Zap, Award } from "lucide-react";
import HeroBanner from "../../components/store/Home/HeroBanner";
import FeaturedCategories from "../../components/store/Home/FeaturedCategories";
import FeaturedProducts from "../../components/store/Home/FeaturedProducts";
import PromotionalBanner from "../../components/store/Home/PromotionalBanner";
import BestSellers from "../../components/store/Home/BestSellers";
import NewArrivals from "../../components/store/Home/NewArrivals";
import FeaturedBrands from "../../components/store/Home/FeaturedBrands";
import FeaturedBranches from "../../components/store/Home/FeaturedBranches";
import Testimonials from "../../components/store/Home/Testimonials";

const Home = () => {
  // Featured Products
  const featuredProducts = [
    {
      id: 1,
      name: "ASUS ROG Strix RTX 4090",
      brand: "ASUS",
      price: 124995,
      originalPrice: 139995,
      rating: 4.9,
      reviews: 128,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=300&h=200&fit=crop",
      badge: "Best Seller",
      badgeColor: "bg-yellow-500",
    },
    {
      id: 2,
      name: "Intel Core i9-13900K",
      brand: "Intel",
      price: 32995,
      originalPrice: 35995,
      rating: 4.8,
      reviews: 256,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop",
      badge: "Top Rated",
      badgeColor: "bg-blue-500",
    },
    {
      id: 3,
      name: "Samsung 990 Pro 2TB NVMe",
      brand: "Samsung",
      price: 12995,
      originalPrice: 15995,
      rating: 4.9,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop",
      badge: "New",
      badgeColor: "bg-green-500",
    },
    {
      id: 4,
      name: "Corsair Vengeance 32GB DDR5",
      brand: "Corsair",
      price: 8995,
      originalPrice: 10995,
      rating: 4.7,
      reviews: 312,
      image:
        "https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&h=200&fit=crop",
      badge: "Sale",
      badgeColor: "bg-red-500",
    },
  ];

  // Best Sellers
  const bestSellers = [
    {
      id: 5,
      name: "Logitech G502 X Plus",
      brand: "Logitech",
      price: 5495,
      sold: 1245,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=200&fit=crop",
    },
    {
      id: 6,
      name: "Razer BlackWidow V4 Pro",
      brand: "Razer",
      price: 8995,
      sold: 892,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33b7f5b8?w=300&h=200&fit=crop",
    },
    {
      id: 7,
      name: 'LG UltraGear 27" 240Hz',
      brand: "LG",
      price: 24995,
      sold: 567,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop",
    },
    {
      id: 8,
      name: "NZXT H9 Flow Case",
      brand: "NZXT",
      price: 7995,
      sold: 445,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=300&h=200&fit=crop",
    },
  ];

  // New Arrivals
  const newArrivals = [
    {
      id: 9,
      name: "AMD Ryzen 7 7800X3D",
      brand: "AMD",
      price: 27995,
      launchDate: "New",
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop",
    },
    {
      id: 10,
      name: "RTX 4070 Ti Super",
      brand: "MSI",
      price: 68995,
      launchDate: "Just Launched",
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=300&h=200&fit=crop",
    },
    {
      id: 11,
      name: "SteelSeries Arctis Nova Pro",
      brand: "SteelSeries",
      price: 15995,
      launchDate: "New",
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=200&fit=crop",
    },
  ];

  // Categories
  const categories = [
    {
      name: "Gaming PC",
      image:
        "https://ecommerce.datablitz.com.ph/cdn/shop/files/GeForceRTX_3050WINDFORCEOCV28G-07.jpg?v=1761275844",
      count: 120,
    },
    {
      name: "Laptop",
      image:
        "https://ecommerce.datablitz.com.ph/cdn/shop/files/GeForceRTX_3050WINDFORCEOCV28G-07.jpg?v=1761275844",
      count: 85,
    },
    {
      name: "Graphics Card",
      image:
        "https://ecommerce.datablitz.com.ph/cdn/shop/files/GeForceRTX_3050WINDFORCEOCV28G-07.jpg?v=1761275844",
      count: 65,
    },
    {
      name: "Monitor",
      image:
        "https://ecommerce.datablitz.com.ph/cdn/shop/files/GeForceRTX_3050WINDFORCEOCV28G-07.jpg?v=1761275844",
      count: 42,
    },
    {
      name: "Processor",
      image:
        "https://ecommerce.datablitz.com.ph/cdn/shop/files/GeForceRTX_3050WINDFORCEOCV28G-07.jpg?v=1761275844",
      count: 35,
    },
    {
      name: "Motherboard",
      image:
        "https://ecommerce.datablitz.com.ph/cdn/shop/files/GeForceRTX_3050WINDFORCEOCV28G-07.jpg?v=1761275844",
      count: 28,
    },
  ];

  // Brands
  const brands = [
    { name: "ASUS", logo: "ASUS", products: 156 },
    { name: "MSI", logo: "MSI", products: 134 },
    { name: "Gigabyte", logo: "Gigabyte", products: 112 },
    { name: "Corsair", logo: "Corsair", products: 98 },
    { name: "Samsung", logo: "Samsung", products: 87 },
    { name: "Logitech", logo: "Logitech", products: 76 },
    { name: "Razer", logo: "Razer", products: 65 },
    { name: "Intel", logo: "Intel", products: 54 },
  ];

  // Branches
  const branches = [
    {
      location: "Makati City",
      address: "123 Tech Avenue, Makati",
      hours: "10AM - 8PM",
      phone: "(02) 8123 4567",
    },
    {
      location: "Quezon City",
      address: "456 Digital Hub, Quezon City",
      hours: "9AM - 9PM",
      phone: "(02) 8765 4321",
    },
    {
      location: "Cebu City",
      address: "789 IT Park, Cebu City",
      hours: "10AM - 7PM",
      phone: "(032) 123 4567",
    },
    {
      location: "Davao City",
      address: "321 Cyber Zone, Davao City",
      hours: "10AM - 8PM",
      phone: "(082) 765 4321",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "John Reyes",
      role: "Professional Gamer",
      rating: 5,
      text: "Best computer parts store in the Philippines! Got my RTX 4090 at a great price. Customer service is top notch!",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Maria Santos",
      role: "Content Creator",
      rating: 5,
      text: "Fast delivery and genuine products. Built my entire editing rig from EasyPC. Highly recommended!",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "IT Professional",
      rating: 5,
      text: "Great selection of components and knowledgeable staff. Will definitely buy again.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  // Promotional Banners
  const promoBanners = [
    {
      title: "Build Your Dream PC",
      subtitle: "Free assembly with purchase of complete system",
      buttonText: "Customize Now",
      color: "from-blue-600 to-purple-600",
      icon: <Zap className="w-12 h-12" />,
    },
    {
      title: "Student Discount",
      subtitle: "10% OFF on all components with valid ID",
      buttonText: "Shop Now",
      color: "from-green-600 to-teal-600",
      icon: <Award className="w-12 h-12" />,
    },
  ];

  const ProductCard = ({ product, showBadge = true }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showBadge && product.badge && (
          <span
            className={`absolute top-2 left-2 ${product.badgeColor} text-white text-xs px-2 py-1 rounded-full`}
          >
            {product.badge}
          </span>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">
            ({product.reviews?.toLocaleString()} reviews)
          </span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ₱{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₱{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {product.sold && (
          <p className="text-xs text-gray-500 mb-3">
            {product.sold.toLocaleString()} sold this month
          </p>
        )}
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Shop by Category */}
      <FeaturedCategories categories={categories} />

      {/* Featured Products */}
      <FeaturedProducts featuredProducts={featuredProducts} />

      {/* Promotional Banner 1 */}
      <PromotionalBanner promoBanners={promoBanners} />

      {/* Best Sellers */}
      <BestSellers bestSellers={bestSellers} />

      {/* New Arrivals */}
      <NewArrivals newArrivals={featuredProducts} />

      {/* Featured Brands */}
      <FeaturedBrands brands={brands} />

      {/* Branch Availability */}
      <FeaturedBranches branches={branches} />

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />
    </div>
  );
};

export default Home;
