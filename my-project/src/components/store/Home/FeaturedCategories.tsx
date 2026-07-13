import React from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData } from "../../../utils/utils";

const FeaturedCategories = () => {
  const { data: categoriesResponse } = useSuspenseQuery({
    queryKey: ["categories-child-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/categories/childrens`),
  });

  const categories = categoriesResponse?.categories ?? [];
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              className="group bg-white shadow-sm border border-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="h-48">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover p-4 group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-4">
                <p className="font-semibold text-gray-900">{category.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
