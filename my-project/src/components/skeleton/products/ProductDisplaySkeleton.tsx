import React from "react";

const ProductDisplaySkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 animate-pulse">
      {/* Left Column - Product Image */}
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div className="w-full aspect-square bg-gray-200 rounded-2xl"></div>
        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-4">
          <div className="aspect-square bg-gray-200 rounded-xl"></div>
          <div className="aspect-square bg-gray-200 rounded-xl"></div>
          <div className="aspect-square bg-gray-200 rounded-xl"></div>
          <div className="aspect-square bg-gray-200 rounded-xl"></div>
        </div>
      </div>

      {/* Right Column - Product Info */}
      <div className="flex flex-col gap-6">
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          
          <div className="h-10 bg-gray-200 rounded w-48 mb-6"></div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="h-12 bg-gray-200 rounded-xl"></div>
          <div className="h-12 bg-gray-200 rounded-xl"></div>
        </div>
        
        <div className="flex gap-4">
          <div className="h-12 bg-gray-200 rounded-xl flex-1"></div>
          <div className="h-12 bg-gray-200 rounded-xl w-12 flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplaySkeleton;
