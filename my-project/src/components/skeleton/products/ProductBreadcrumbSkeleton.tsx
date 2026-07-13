import React from "react";

const ProductBreadcrumbSkeleton = () => {
  return (
    <nav className="flex mb-6 text-sm flex-wrap items-center animate-pulse gap-2">
      <div className="h-4 bg-gray-200 rounded w-12"></div>
      <span className="text-gray-300">/</span>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
      <span className="text-gray-300">/</span>
      <div className="h-4 bg-gray-200 rounded w-20"></div>
      <span className="text-gray-300">/</span>
      <div className="h-4 bg-gray-200 rounded w-32"></div>
    </nav>
  );
};

export default ProductBreadcrumbSkeleton;
