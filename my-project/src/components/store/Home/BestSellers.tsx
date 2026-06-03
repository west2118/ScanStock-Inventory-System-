import { ChevronRight } from "lucide-react";
import React from "react";
import ProductCard from "../UI/ProductCard";

const BestSellers = ({ bestSellers }: { bestSellers: any }) => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Best Sellers
            </h2>
            <p className="text-gray-500 mt-1">Customer favorites this month</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} showBadge={false} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
