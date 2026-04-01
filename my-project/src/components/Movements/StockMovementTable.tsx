import { useState } from "react";
import { Search, ArrowUpDown, Plus } from "lucide-react";
import StockMovementTableRow from "./StockMovementTableRow";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/utils";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import { categories } from "../../utils/constants";
import TableRowNoData from "../TableRowNoDataSkeleton";
import TableRowErrorHandling from "../TableRowErrorHandling";
import TableRowSkeleton from "../Skeletons/TableRowSkeleton";
import Pagination from "../Pagination";
import type { InventoryMovementType } from "../../utils/types";
import StockMovementDetailModal from "./StockMovementDetailModal";

type InventoryMovementsData = {
  movements: InventoryMovementType[];
  page: number;
  total: number;
  totalPages: number;
};

const StockMovementTable = () => {
  const [isMovementDetails, setIsMovementDetails] = useState(false);
  const [selectedMovementId, setSelectedMovementId] = useState(0);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const debouncedSearch = useDebounceInput(search);
  const { data, isLoading, isError, refetch } =
    useQuery<InventoryMovementsData>({
      queryKey: [
        "stock-movements-data",
        page,
        limit,
        type,
        category,
        debouncedSearch,
      ],
      queryFn: fetchData(
        `http://localhost:5001/api/stock-movements
      ?page=${page}
      &limit=${limit}
      &search=${debouncedSearch}
      &type=${type}
      &category=${category}`.replace(/\s+/g, ""),
      ),
      placeholderData: keepPreviousData,
    });

  const handleSelectMovement = (movementId: number) => {
    setIsMovementDetails(true);
    setSelectedMovementId(movementId);
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

            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">All Types</option>
              <option value="IN">Stock In</option>
              <option value="OUT">Stock Out</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movements Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center gap-1">
                    Date & Time
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center gap-1">
                    Product
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center justify-center gap-1">
                    Quantity
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Change
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center gap-1">
                    User
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && <TableRowSkeleton columns={8} />}

              {!isLoading && isError && (
                <TableRowErrorHandling
                  col={8}
                  title="products"
                  refetch={refetch}
                />
              )}

              {!isLoading &&
                !isError &&
                data?.movements.map((movement) => (
                  <StockMovementTableRow
                    key={movement.id}
                    movement={movement}
                    handleSelectMovement={handleSelectMovement}
                  />
                ))}

              {!isLoading && !isError && data?.movements?.length === 0 && (
                <TableRowNoData title="movements" col={8} />
              )}
            </tbody>

            <Pagination
              limit={limit}
              page={page}
              total={data?.total}
              totalPages={data?.totalPages}
              setPage={setPage}
              setLimit={setLimit}
              col={8}
            />
          </table>
        </div>

        {isMovementDetails && (
          <StockMovementDetailModal
            isModalOpen={isMovementDetails}
            isCloseModal={() => setIsMovementDetails(false)}
            selectedMovementId={selectedMovementId}
          />
        )}
      </div>
    </>
  );
};

export default StockMovementTable;
