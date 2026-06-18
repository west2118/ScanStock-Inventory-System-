import { Search, Filter, Package, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../lib/utils";

type ProductsFiltersProps = {
  searchInput: string;
  setSearchInput: (value: string) => void;
  filters: {
    categoryId: string;
    brandId?: string;
  };
  setParams: (params: any) => void;
  handleCreateProduct: () => void;
};

const ProductsFilters = ({
  searchInput,
  setSearchInput,
  filters,
  setParams,
  handleCreateProduct,
}: ProductsFiltersProps) => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/categories`),
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/brands`),
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between w-full">
        <div className="flex flex-col sm:flex-row flex-1 gap-3 w-full">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product or brand..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-white sm:w-auto w-full shrink-0">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={filters.categoryId}
              onChange={(e) =>
                setParams({
                  categoryId: e.target.value,
                  page: 1,
                })
              }
              className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer w-full"
            >
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id === "all" ? "" : cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-white sm:w-auto w-full shrink-0">
            <Package className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={filters.brandId || ""}
              onChange={(e) =>
                setParams({
                  brandId: e.target.value,
                  page: 1,
                })
              }
              className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer w-full"
            >
              {brands.map((brand: any) => (
                <option key={brand.id} value={brand.id === "all" ? "" : brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleCreateProduct}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto justify-center"
          >
            <Plus size={18} />
            <span>Add Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilters;
