import { Package } from "lucide-react";
import React from "react";

const FeaturedBrands = ({ brands }: { brands: any }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured Brands
          </h2>
          <p className="text-gray-500 mt-1">
            Shop from the world's leading brands
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="text-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-2">
                <Package className="w-8 h-8 text-gray-600" />
              </div>
              <p className="font-medium text-gray-900 text-sm">{brand.name}</p>
              <p className="text-xs text-gray-400">{brand.products} products</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
