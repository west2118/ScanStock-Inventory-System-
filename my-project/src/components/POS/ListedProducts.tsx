import { Search, Barcode, Package } from "lucide-react";
import { useState } from "react";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/utils";
import type { ItemType, ProductType } from "../../utils/types";
import ProductListedCard from "./ProductListedCard";

type ListedProductsProps = {
  items: ItemType[];
  setItems: any;
  addItem: (item: ProductType) => void;
};

const ListedProducts = ({ addItem, setItems, items }: ListedProductsProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);

  const { data, isLoading, isError, refetch } = useQuery<ProductType[]>({
    queryKey: ["products-listed", debouncedSearch],
    queryFn: fetchData(
      `http://localhost:5001/api/products/listed?search=${debouncedSearch}`,
    ),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="lg:col-span-2">
      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by product name, SKU, or scan barcode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            autoFocus
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
            <Barcode size={16} />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[calc(100vh-320px)] overflow-y-auto">
          {data?.map((product) => (
            <ProductListedCard
              key={product.id}
              product={product}
              addItem={addItem}
              items={items}
            />
          ))}
        </div>
        {data?.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListedProducts;
