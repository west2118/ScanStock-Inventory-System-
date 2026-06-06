import React, { useState } from "react";
import {
  Package,
  Search,
  Filter,
  Plus,
  Minus,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Download,
  Printer,
  Calendar,
  User,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  MinusCircle,
  X,
  ChevronDown,
  ChevronUp,
  Layers,
  Activity,
} from "lucide-react";
import { useDebounceInput } from "../../../hooks/useDebounceInput";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../utils/utils";
import StockAdjustmentTableRow from "./StockAdjustmentTableRow";
import type { StockAdjustmentType } from "../../../utils/types";

type StockAdjustmentsTableProps = {
  handleViewStockAdjustment: (stockAdjustment: StockAdjustmentType) => void;
};

const StockAdjustmentsTable = ({
  handleViewStockAdjustment,
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

  const { data, isLoading, isError, refetch } = useQuery({
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

  console.log("Data: ", data);

  const [adjustments, setAdjustments] = useState([
    {
      id: 1,
      adjustmentId: "ADJ-2024-001",
      date: "2024-01-15",
      time: "10:30 AM",
      type: "add",
      status: "approved",
      reason: "Stock replenishment from supplier",
      reference: "PO #12345",
      createdBy: "Admin User",
      approvedBy: "Sarah M.",
      notes: "Restock for upcoming sale",
      totalQuantity: 70,
      items: [
        {
          productId: 1,
          productName: "Wireless Mouse",
          sku: "WM-001",
          previousStock: 4,
          quantity: 20,
          newStock: 24,
        },
        {
          productId: 2,
          productName: "USB-C Cable",
          sku: "UC-042",
          previousStock: 27,
          quantity: 30,
          newStock: 57,
        },
        {
          productId: 3,
          productName: "LED Bulb",
          sku: "LB-089",
          previousStock: 10,
          quantity: 20,
          newStock: 30,
        },
      ],
    },
    {
      id: 2,
      adjustmentId: "ADJ-2024-002",
      date: "2024-01-14",
      time: "02:20 PM",
      type: "remove",
      status: "pending",
      reason: "Damaged items for return",
      reference: "RMA #123",
      createdBy: "John D.",
      approvedBy: null,
      notes: "Physical damage during transit",
      totalQuantity: 8,
      items: [
        {
          productId: 2,
          productName: "USB-C Cable",
          sku: "UC-042",
          previousStock: 57,
          quantity: 5,
          newStock: 52,
        },
        {
          productId: 3,
          productName: "LED Bulb",
          sku: "LB-089",
          previousStock: 30,
          quantity: 3,
          newStock: 27,
        },
      ],
    },
    {
      id: 3,
      adjustmentId: "ADJ-2024-003",
      date: "2024-01-13",
      time: "11:45 AM",
      type: "add",
      status: "approved",
      reason: "New stock arrival",
      reference: "PO #12346",
      createdBy: "Anna K.",
      approvedBy: "John D.",
      notes: "Summer collection",
      totalQuantity: 100,
      items: [
        {
          productId: 4,
          productName: "Cotton T-Shirt",
          sku: "CT-101",
          previousStock: 45,
          quantity: 50,
          newStock: 95,
        },
        {
          productId: 5,
          productName: "Jeans",
          sku: "JN-202",
          previousStock: 38,
          quantity: 50,
          newStock: 88,
        },
      ],
    },
    {
      id: 4,
      adjustmentId: "ADJ-2024-004",
      date: "2024-01-12",
      time: "03:30 PM",
      type: "remove",
      status: "approved",
      reason: "Customer returns",
      reference: "RTN-001",
      createdBy: "John D.",
      approvedBy: "Sarah M.",
      notes: "Refund processed",
      totalQuantity: 11,
      items: [
        {
          productId: 5,
          productName: "Jeans",
          sku: "JN-202",
          previousStock: 88,
          quantity: 6,
          newStock: 82,
        },
        {
          productId: 4,
          productName: "Cotton T-Shirt",
          sku: "CT-101",
          previousStock: 95,
          quantity: 5,
          newStock: 90,
        },
      ],
    },
    {
      id: 5,
      adjustmentId: "ADJ-2024-005",
      date: "2024-01-11",
      time: "10:00 AM",
      type: "add",
      status: "approved",
      reason: "Bulk purchase - stock replenishment",
      reference: "PO #12347",
      createdBy: "Sarah M.",
      approvedBy: "Admin",
      notes: "Warehouse transfer",
      totalQuantity: 65,
      items: [
        {
          productId: 6,
          productName: "Organic Rice 5kg",
          sku: "GR-005",
          previousStock: 100,
          quantity: 50,
          newStock: 150,
        },
        {
          productId: 7,
          productName: "Olive Oil 1L",
          sku: "GR-008",
          previousStock: 90,
          quantity: 15,
          newStock: 105,
        },
      ],
    },
    {
      id: 6,
      adjustmentId: "ADJ-2024-006",
      date: "2024-01-10",
      time: "04:00 PM",
      type: "remove",
      status: "cancelled",
      reason: "Expired items",
      reference: "EXP-001",
      createdBy: "Mike R.",
      approvedBy: null,
      notes: "Order cancelled - wrong items",
      totalQuantity: 5,
      items: [
        {
          productId: 7,
          productName: "Olive Oil 1L",
          sku: "GR-008",
          previousStock: 105,
          quantity: 5,
          newStock: 100,
        },
      ],
    },
  ]);

  const adjustmentTypes = ["all", "add", "remove"];
  const statuses = ["all", "pending", "approved", "cancelled"];
  const dateRanges = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "Last 7 Days" },
    { value: "month", label: "Last 30 Days" },
  ];

  // Filter adjustments
  const filteredAdjustments = adjustments
    .filter((adj) => {
      const matchesSearch =
        adj.adjustmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adj.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adj.items.some((item) =>
          item.productName.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesType = selectedType === "all" || adj.type === selectedType;
      const matchesStatus =
        selectedStatus === "all" || adj.status === selectedStatus;

      let matchesDate = true;
      const adjDate = new Date(adj.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateRange === "today") {
        matchesDate = adjDate.getTime() === today.getTime();
      } else if (dateRange === "yesterday") {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        matchesDate = adjDate.getTime() === yesterday.getTime();
      } else if (dateRange === "week") {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesDate = adjDate >= weekAgo;
      } else if (dateRange === "month") {
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        matchesDate = adjDate >= monthAgo;
      }

      return matchesSearch && matchesType && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison =
          new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time);
      } else if (sortBy === "id") {
        comparison = a.adjustmentId.localeCompare(b.adjustmentId);
      } else if (sortBy === "quantity") {
        comparison = a.totalQuantity - b.totalQuantity;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, reason, or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
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
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <AlertCircle className="w-4 h-4 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all"
                      ? "All Status"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div>
            <button
              onClick={() => setShowBulkModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Layers size={18} />
              <span>New Adjustment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Adjustments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  className="text-left p-6 text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-800"
                  onClick={() => handleSort("id")}
                >
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
                <th className="text-left p-6 text-sm font-semibold text-gray-600">
                  Products
                </th>
                <th className="text-center p-6 text-sm font-semibold text-gray-600">
                  Type
                </th>
                <th
                  className="text-center p-6 text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-800"
                  onClick={() => handleSort("quantity")}
                >
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
                <th className="text-left p-6 text-sm font-semibold text-gray-600">
                  Reason
                </th>
                <th className="text-center p-6 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left p-6 text-sm font-semibold text-gray-600">
                  Created By
                </th>
                <th className="text-center p-6 text-sm font-semibold text-gray-600">
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
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
            <span className="text-gray-600">
              Showing {filteredAdjustments.length} of {adjustments.length}{" "}
              adjustments
            </span>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <PlusCircle size={12} className="text-green-500" />
                Additions:{" "}
                {filteredAdjustments
                  .filter((a) => a.type === "add")
                  .reduce((sum, a) => sum + a.totalQuantity, 0)}
              </span>
              <span className="flex items-center gap-1">
                <MinusCircle size={12} className="text-red-500" />
                Removals:{" "}
                {filteredAdjustments
                  .filter((a) => a.type === "remove")
                  .reduce((sum, a) => sum + a.totalQuantity, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockAdjustmentsTable;
