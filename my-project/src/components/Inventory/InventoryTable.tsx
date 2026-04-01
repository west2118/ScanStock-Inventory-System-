// Inventory.jsx - Inventory Management Page
import { useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import InventoryTableRow from "./InventoryTableRow";
import { fetchData } from "../../utils/utils";
import type { ProductType } from "../../utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import { categories } from "../../utils/constants";
import Pagination from "../Pagination";
import TableRowNoData from "../TableRowNoDataSkeleton";
import TableRowErrorHandling from "../TableRowErrorHandling";
import TableRowSkeleton from "../Skeletons/TableRowSkeleton";
import InentoryStockModal from "./InentoryStockModal";

type ProductsData = {
  products: ProductType[];
  page: number;
  total: number;
  totalPages: number;
};

const InventoryTable = () => {
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [movementType, setMovementType] = useState<"IN" | "OUT">("IN");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const debouncedSearch = useDebounceInput(search);
  const { data, isLoading, isError, refetch } = useQuery<ProductsData>({
    queryKey: ["products-data", page, limit, status, category, debouncedSearch],
    queryFn: fetchData(
      `http://localhost:5001/api/products
      ?page=${page}
      &limit=${limit}
      &search=${debouncedSearch}
      &status=${status}
      &category=${category}`.replace(/\s+/g, ""),
    ),
    placeholderData: keepPreviousData,
  });

  const handleSelectProduct = (product: ProductType, action: "IN" | "OUT") => {
    setSelectedProduct(product);
    setIsStockModalOpen(true);

    if (action === "IN") {
      setMovementType(action);
    } else if (action === "OUT") {
      setMovementType(action);
    }
  };

  return (
    <>
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 flex-wrap">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center gap-1">
                    Product
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU/Barcode
                </th>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center gap-1">
                    Category
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center justify-end gap-1">
                    Stock
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="p-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center justify-center gap-1">
                    Status
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {isLoading && <TableRowSkeleton columns={7} />}

              {!isLoading && isError && (
                <TableRowErrorHandling
                  col={7}
                  title="products"
                  refetch={refetch}
                />
              )}

              {!isLoading &&
                !isError &&
                data?.products.map((item) => (
                  <InventoryTableRow
                    key={item.id}
                    item={item}
                    handleSelectProduct={handleSelectProduct}
                  />
                ))}

              {!isLoading && !isError && data?.products?.length === 0 && (
                <TableRowNoData title="products" col={7} />
              )}
            </tbody>

            <Pagination
              limit={limit}
              page={page}
              total={data?.total}
              totalPages={data?.totalPages}
              setPage={setPage}
              setLimit={setLimit}
              col={7}
            />
          </table>
        </div>
      </div>

      {isStockModalOpen && (
        <InentoryStockModal
          isModalOpen={isStockModalOpen}
          isCloseModal={() => setIsStockModalOpen(false)}
          selectedProduct={selectedProduct}
          movementType={movementType}
        />
      )}
    </>
  );
};

export default InventoryTable;
