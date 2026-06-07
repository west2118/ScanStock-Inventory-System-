import { Search } from "lucide-react";
import { categories } from "../../../utils/constants";

type InventoryFilters = {
  page: number;
  limit: number;
  search: string;
  status: string;
  category: string;
};

type InventoryFilterProps = {
  filters: InventoryFilters;
  searchInput: string;
  setSearchInput: (value: string) => void;
  setParams: (params: Partial<InventoryFilters>) => void;
};

const InventoryFilter = ({
  filters,
  searchInput,
  setSearchInput,
  setParams,
}: InventoryFilterProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full"
          />
        </div>

        <select
          value={filters.category}
          onChange={(e) =>
            setParams({
              category: e.target.value,
              page: 1,
            })
          }
          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            setParams({
              status: e.target.value,
              page: 1,
            })
          }
          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default InventoryFilter;
