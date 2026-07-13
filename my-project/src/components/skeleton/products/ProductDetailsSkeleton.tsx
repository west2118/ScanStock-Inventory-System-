import React from "react";
import ProductBreadcrumbSkeleton from "./ProductBreadcrumbSkeleton";
import ProductDisplaySkeleton from "./ProductDisplaySkeleton";
import ProductTabsSkeleton from "./ProductTabsSkeleton";
import ProductCardSkeleton from "../ProductCardSkeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductBreadcrumbSkeleton />
        <ProductDisplaySkeleton />
        <ProductTabsSkeleton />
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
