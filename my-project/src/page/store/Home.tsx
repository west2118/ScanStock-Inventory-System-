import { Suspense } from "react";
import HeroBanner from "../../components/store/Home/HeroBanner";
import FeaturedCategories from "../../components/store/Home/FeaturedCategories";
import FeaturedProducts from "../../components/store/Home/FeaturedProducts";
import PromotionalBanner from "../../components/store/Home/PromotionalBanner";
import BestSellers from "../../components/store/Home/BestSellers";
import NewArrivals from "../../components/store/Home/NewArrivals";
import FeaturedBranches from "../../components/store/Home/FeaturedBranches";
import Testimonials from "../../components/store/Home/Testimonials";

import FeaturedCategoriesSkeleton from "../../components/skeleton/home/FeaturedCategoriesSkeleton";
import ProductCarouselSkeleton from "../../components/skeleton/home/ProductCarouselSkeleton";
import FeaturedBranchesSkeleton from "../../components/skeleton/home/FeaturedBranchesSkeleton";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroBanner />

      <Suspense fallback={<FeaturedCategoriesSkeleton />}>
        <FeaturedCategories />
      </Suspense>

      <Suspense fallback={<ProductCarouselSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      <PromotionalBanner />

      <Suspense fallback={<ProductCarouselSkeleton />}>
        <BestSellers />
      </Suspense>

      <Suspense fallback={<ProductCarouselSkeleton />}>
        <NewArrivals />
      </Suspense>

      <Suspense fallback={<FeaturedBranchesSkeleton />}>
        <FeaturedBranches />
      </Suspense>

      <Testimonials />
    </div>
  );
};

export default Home;
