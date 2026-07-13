import React from "react";

const FeaturedCategoriesSkeleton = () => {
  return (
    <section className="py-12 bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden h-[17.5rem]">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategoriesSkeleton;
