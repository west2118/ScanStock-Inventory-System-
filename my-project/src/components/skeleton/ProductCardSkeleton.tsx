import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4 flex flex-col flex-1">
        <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        
        <div className="h-5 bg-gray-200 rounded w-24 mb-3"></div>
        
        <div className="mt-auto pt-3 flex gap-2">
          <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
