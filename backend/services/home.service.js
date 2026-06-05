import { getProducts } from "../controllers/v2/products.controller";

export const getHomeService = async () => {
  const [featuredProducts, bestSellers, newArrivals, categories] =
    await Promise.all([
      getProducts(),
      getBestSellers(),
      getNewArrivals(),
      getCategoriesService(),
    ]);

  return {
    heroBanners: [],
    featuredProducts,
    bestSellers,
    newArrivals,
    categories,
  };
};
