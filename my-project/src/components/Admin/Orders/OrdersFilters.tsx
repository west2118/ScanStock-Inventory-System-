import { Calendar, Download, Filter, Printer, RefreshCw, Search, Truck } from "lucide-react";
import React, { useState, useEffect } from "react";

type OrdersFiltersProps = {
  search: string;
  payment: string;
  date: string;
  onFilterChange: (key: string, value: string) => void;
};

const OrdersFilters = ({ search, payment, date, onFilterChange }: OrdersFiltersProps) => {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        onFilterChange("search", localSearch);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, search, onFilterChange]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by order ID or customer..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 hover:border-gray-300">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={payment}
              onChange={(e) => onFilterChange("payment", e.target.value)}
              className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer w-full font-medium"
            >
              <option value="all">All Payments</option>
              <option value="card">Credit Card</option>
              <option value="gcash">GCash</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <div className="flex-1 md:flex-none flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 hover:border-gray-300">
            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={date}
              onChange={(e) => onFilterChange("date", e.target.value)}
              className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer w-full font-medium"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="thisyear">This year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersFilters;
