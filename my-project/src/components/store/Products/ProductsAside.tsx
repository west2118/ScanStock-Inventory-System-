import { X, ChevronUp, ChevronDown, Star } from "lucide-react";
import React, { useState } from "react";

const FilterSection = ({ title, children, defaultOpen = true }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 bg-white text-sm font-medium text-gray-900"
      >
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
        {title}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

const ProductsAside = ({ categories, brands, filters, setParams }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    filters?.brandId ? String(filters.brandId).split(",") : []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filters?.categoryId ? String(filters.categoryId).split(",") : []
  );
  const [priceRange, setPriceRange] = useState({ min: 0, max: 6000 });

  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const handleBrandToggle = (id: string) => {
    const nextBrands = selectedBrands.includes(id)
      ? selectedBrands.filter((b) => b !== id)
      : [...selectedBrands, id];
    setSelectedBrands(nextBrands);
    if (setParams) setParams({ brandId: nextBrands.join(","), page: 1 });
  };

  const handleCategoryToggle = (id: string) => {
    const nextCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((c) => c !== id)
      : [...selectedCategories, id];
    setSelectedCategories(nextCategories);
    if (setParams) setParams({ categoryId: nextCategories.join(","), page: 1 });
  };

  const handleDiscountToggle = (value: string) => {
    setSelectedDiscounts((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };

  const handleRatingToggle = (value: number) => {
    setSelectedRatings((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  return (
    <aside
      className={`lg:block w-52 flex-shrink-0 border-r border-gray-100 pr-4 ${sidebarOpen ? "block fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden"
        }`}
    >
      {sidebarOpen && (
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={() => setSidebarOpen(false)} className="p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="space-y-1">
        {/* Price Section */}
        <FilterSection title="Price, ₱">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Max"
              />
            </div>

            <div className="px-2 mt-6">
              <div className="relative h-1 bg-gray-200 rounded-full">
                {/* Simulated dual thumb range slider */}
                <div
                  className="absolute h-full bg-[#0088cc] rounded-full"
                  style={{ left: "10%", right: "10%" }}
                ></div>

                {/* Thumb Left */}
                <div className="absolute top-1/2 -translate-y-1/2 w-2 h-4 bg-[#0088cc] rounded-sm cursor-pointer" style={{ left: "10%" }}></div>

                {/* Thumb Right */}
                <div className="absolute top-1/2 -translate-y-1/2 w-2 h-4 bg-[#0088cc] rounded-sm cursor-pointer" style={{ left: "90%" }}></div>

                {/* Ticks */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[25%] w-[1px] h-2 bg-gray-300"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-[1px] h-2 bg-gray-300"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-[75%] w-[1px] h-2 bg-gray-300"></div>
              </div>

              <div className="flex justify-between text-[10px] text-gray-800 mt-3 font-medium">
                <span>₱32</span>
                <span>₱1.5k</span>
                <span>₱3.0k</span>
                <span>₱4.5k</span>
                <span>₱6.0k</span>
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Availability Section */}
        <FilterSection title="Availability">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 py-1 rounded text-sm">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => setInStockOnly(!inStockOnly)}
              className="w-3.5 h-3.5 rounded border-gray-300 text-[#0088cc] focus:ring-[#0088cc]"
            />
            <span className="text-gray-600">In Stock (9)</span>
          </label>
        </FilterSection>

        {/* Brand Section */}
        <FilterSection title="Brand">
          <div className="space-y-1 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
            {brands?.filter((b: any) => b.id !== "all").map((brand: any) => (
              <label
                key={brand.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 py-1 rounded text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(String(brand.id))}
                  onChange={() => handleBrandToggle(String(brand.id))}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-[#0088cc] focus:ring-[#0088cc]"
                />
                <span className="text-gray-600 uppercase flex-1">{brand.name}</span>
                <span className="text-gray-500">({brand.count})</span>
              </label>
            ))}
          </div>
        </FilterSection>



        {/* Rating Section */}
        <FilterSection title="Rating">
          <div className="space-y-1">
            {[5, 4, 3, 2, 1, 0].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 py-1 rounded text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingToggle(rating)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-[#0088cc] focus:ring-[#0088cc]"
                />
                <div className="flex items-center flex-1">
                  {rating === 0 ? (
                    <span className="text-gray-600">No reviews</span>
                  ) : (
                    <div className="flex gap-[2px]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < rating
                            ? "fill-green-500 text-green-500"
                            : "fill-gray-200 text-gray-200"
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-gray-500">
                  ({rating === 0 ? 157 : Math.floor(Math.random() * 5)})
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Category Section */}
        <FilterSection title="Category">
          <div className="space-y-1 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
            {categories?.filter((c: any) => c.id !== "all").map((category: any) => (
              <label
                key={category.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 py-1 rounded text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(String(category.id))}
                  onChange={() => handleCategoryToggle(String(category.id))}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-[#0088cc] focus:ring-[#0088cc]"
                />
                <span className="text-gray-600 uppercase flex-1">{category.name}</span>
                <span className="text-gray-500">({category.count ?? 0})</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Clear Filters */}
      {(selectedCategories.length > 0 ||
        selectedBrands.length > 0 ||
        selectedDiscounts.length > 0 ||
        selectedRatings.length > 0 ||
        inStockOnly ||
        priceRange.min > 0 ||
        priceRange.max < 6000) && (
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedBrands([]);
              setSelectedDiscounts([]);
              setSelectedRatings([]);
              setInStockOnly(false);
              setPriceRange({ min: 0, max: 6000 });
              if (setParams) {
                setParams({ categoryId: "", brandId: "", page: 1 });
              }
            }}
            className="w-full mt-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            Clear All Filters
          </button>
        )}
    </aside>
  );
};

export default ProductsAside;
