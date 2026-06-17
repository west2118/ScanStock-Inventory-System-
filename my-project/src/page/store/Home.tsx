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
import { fetchData } from "../../utils/utils";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data: categoriesResponse, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories-child-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/categories/childrens`),
  });

  const { data: bestSellersResponse, isLoading: bestSellersLoading } = useQuery(
    {
      queryKey: ["best-sellers"],
      queryFn: fetchData(
        `${import.meta.env.VITE_API_URL}/products/best-sellers`,
      ),
    },
  );

  const { data: newArrivalsResponse, isLoading: newArrivalsLoading } = useQuery(
    {
      queryKey: ["new-arrivals"],
      queryFn: fetchData(
        `${import.meta.env.VITE_API_URL}/products/new-arrivals`,
      ),
    },
  );

  const { data: featuredResponse, isLoading: featuredLoading } = useQuery(
    {
      queryKey: ["featured-products"],
      queryFn: fetchData(
        `${import.meta.env.VITE_API_URL}/products/featured`,
      ),
    },
  );

  const { data: branchesResponse, isLoading: branchesLoading } = useQuery({
    queryKey: ["branches-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/branches`),
  });

  const dynamicFeaturedProducts = featuredResponse?.products ?? [];

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
      text: "Fast delivery and genuine products. Built my entire editing rig from ByteForge. Highly recommended!",
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

  return (
    <div className="min-h-screen bg-white">
      <HeroBanner />

      <FeaturedCategories categories={categoriesResponse?.categories ?? []} />

      <FeaturedProducts featuredProducts={dynamicFeaturedProducts} />

      <PromotionalBanner promoBanners={promoBanners} />

      <BestSellers bestSellers={bestSellersResponse?.products ?? []} />

      <NewArrivals newArrivals={newArrivalsResponse?.products ?? []} />

      <FeaturedBranches branches={branches} />

      <Testimonials testimonials={testimonials} />
    </div>
  );
};

export default Home;
