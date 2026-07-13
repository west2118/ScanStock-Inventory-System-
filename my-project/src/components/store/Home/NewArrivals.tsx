import { ChevronRight, ShoppingCart } from "lucide-react";
import React from "react";
import ProductCarousel from "./ProductCarousel";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData } from "../../../utils/utils";

const NewArrivals = () => {
  const { data: newArrivalsResponse } = useSuspenseQuery({
    queryKey: ["new-arrivals"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/products/new-arrivals`),
  });

  const newArrivals = newArrivalsResponse?.products ?? [];
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              New Arrivals
            </h2>
            <p className="text-gray-500 mt-1">Fresh from the manufacturers</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <ProductCarousel products={newArrivals} />
      </div>
    </section>
  );
};

export default NewArrivals;
