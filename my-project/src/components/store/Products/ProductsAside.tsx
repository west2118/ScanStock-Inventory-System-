import { X } from "lucide-react";
import React, { useState } from "react";

const ProductsAside = ({ categories, brands }: any) => {
  const [viewMode, setViewMode] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 150000 });
  const [sortBy, setSortBy] = useState("featured");

  return (
    <aside
      className={`lg:block w-52 flex-shrink-0 ${sidebarOpen ? "block fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden"}`}
    >
      {sidebarOpen && (
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={() => setSidebarOpen(false)} className="p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Categories - Compact */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-900 text-sm mb-2">Categories</h3>
        <div className="space-y-1">
          {categories?.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg transition-colors text-sm ${
                selectedCategory === category.id
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs text-gray-400">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brands - Compact */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-900 text-sm mb-2">Brands</h3>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {brands?.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-lg text-sm"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.id)}
                  //   onChange={() => handleBrandToggle(brand.id)}
                  className="w-3.5 h-3.5 text-blue-600 rounded border-gray-300"
                />
                <span className="text-gray-700">{brand.name}</span>
              </div>
              <span className="text-xs text-gray-400">{brand.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range - Compact */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-900 text-sm mb-2">
          Price Range
        </h3>
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    min: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm"
                placeholder="Min"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    max: parseInt(e.target.value) || 150000,
                  })
                }
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm"
                placeholder="Max"
              />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="150000"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({
                ...priceRange,
                max: parseInt(e.target.value),
              })
            }
            className="w-full h-1"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategory !== "all" ||
        selectedBrands.length > 0 ||
        searchTerm ||
        priceRange.min > 0 ||
        priceRange.max < 150000) && (
        <button className="w-full py-1.5 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
          Clear All Filters
        </button>
      )}
    </aside>
  );
};

export default ProductsAside;
