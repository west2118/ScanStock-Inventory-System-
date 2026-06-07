import { useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Calendar,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";
import { useDebounceInput } from "../../../hooks/useDebounceInput";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../utils/utils";
import StockAdjustmentTableRow from "./StockAdjustmentTableRow";
import type { StockAdjustmentType } from "../../../utils/types";

type StockAdjustmentsTableProps = {
  handleViewStockAdjustment: (stockAdjustment: StockAdjustmentType) => void;
  handleApproveStockAdjustment: (stockAdjustment: StockAdjustmentType) => void;
  handleRejectStockAdjustment: (stockAdjustment: StockAdjustmentType) => void;
};

type StockAdjustmentsData = {
  adjustments: StockAdjustmentType[];
  pagination: {
    page: number;
    total: number;
    totalPages: number;
    limit: number;
  };
};

const StockAdjustmentsTable = ({
  handleViewStockAdjustment,
  handleApproveStockAdjustment,
  handleRejectStockAdjustment,
}: StockAdjustmentsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAdjustment, setSelectedAdjustment] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const debouncedSearch = useDebounceInput(search);

  const { data, isLoading, isError, refetch } = useQuery<StockAdjustmentsData>({
    queryKey: [
      "stock-adjustments-data",
      page,
      limit,
      status,
      category,
      debouncedSearch,
    ],
    queryFn: fetchData(
      `http://localhost:5001/api/stock-adjustments
      ?page=${page}
      &limit=${limit}
      &search=${debouncedSearch}
      &status=${status}
      &category=${category}`.replace(/\s+/g, ""),
    ),
    placeholderData: keepPreviousData,
  });

  const adjustmentTypes = ["all", "add", "remove"];
  const statuses = ["all", "pending", "approved", "cancelled"];
  const dateRanges = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "Last 7 Days" },
    { value: "month", label: "Last 30 Days" },
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="search"
                placeholder="Search by ID, reason, or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full"
              />
            </div>
            {/* <button
              type="button"
              className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button> */}

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {adjustmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all"
                    ? "All Types"
                    : type === "add"
                      ? "Stock In"
                      : "Stock Out"}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Status"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowBulkModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
          >
            <Layers size={18} />
            <span>New Adjustment</span>
          </button>
        </div>
      </div>

      {/* Adjustments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center gap-1">
                    Adjustment ID / Date
                    {sortBy === "id" &&
                      (sortOrder === "asc" ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      ))}
                  </div>
                </th>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  Products
                </th>
                <th className="p-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  Type
                </th>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center justify-center gap-1">
                    Total Qty
                    {sortBy === "quantity" &&
                      (sortOrder === "asc" ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      ))}
                  </div>
                </th>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  Reason
                </th>
                <th className="p-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  Status
                </th>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  Created By
                </th>
                <th className="p-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.adjustments.map((adj) => (
                <StockAdjustmentTableRow
                  key={adj.id}
                  adj={adj}
                  handleViewStockAdjustment={handleViewStockAdjustment}
                  handleApproveStockAdjustment={handleApproveStockAdjustment}
                  handleRejectStockAdjustment={handleRejectStockAdjustment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StockAdjustmentsTable;
