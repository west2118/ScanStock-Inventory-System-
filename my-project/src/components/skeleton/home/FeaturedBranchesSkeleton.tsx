import React from "react";

const FeaturedBranchesSkeleton = () => {
  return (
    <section className="py-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-100 p-6 h-[17rem]">
              <div className="flex gap-3 mb-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
              <div className="mt-auto pt-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="mt-4 h-10 bg-gray-200 rounded-lg w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBranchesSkeleton;
