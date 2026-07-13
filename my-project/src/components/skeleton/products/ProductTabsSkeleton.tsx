import React from "react";

const ProductTabsSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-12 animate-pulse">
      {/* Tabs Header */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6 px-6 py-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-28"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-52"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabsSkeleton;
