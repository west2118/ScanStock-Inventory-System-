// TransactionsPage.jsx - Transactions History Page
import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Printer,
  Receipt,
  XCircle,
  ArrowUpDown,
} from "lucide-react";
import TransactionTableRow from "./TransactionTableRow";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import type { TransactionType } from "../../utils/types";
import { fetchData } from "../../utils/utils";

type TransactionsData = {
  transactions: TransactionType[];
  page: number;
  total: number;
  totalPages: number;
};

const TransactionTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const limit = Number(searchParams.get("limit")) || 10;

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounceInput(searchInput);

  const { data, isLoading, isError, refetch } = useQuery<TransactionsData>({
    queryKey: ["transactions-data", page, limit, status, debouncedSearch],
    queryFn: fetchData(
      `http://localhost:5001/api/transactions?page=${page}&limit=${limit}&search=${debouncedSearch}&status=${status}`,
    ),
    placeholderData: keepPreviousData,
    refetchInterval: 30000, // every 30 seconds
  });

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams({ search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const updateParams = (newParams: Record<string, any>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([key, value]) => {
        if (!value) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      return params;
    });
  };

  console.log(data?.transactions);

  return (
    <>
      {/* Filters and Search */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by transaction ID, customer, or cashier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div className="sm:w-40 relative">
            <Filter
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 appearance-none bg-white"
            >
              <option value="all">All Methods</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>

          <div className="sm:w-40 relative">
            <Calendar
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 appearance-none bg-white"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div> */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center gap-1">
                    Transaction ID / Date
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center gap-1">
                    Customer
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                  <div className="flex items-center justify-end gap-1">
                    Amount
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cashier
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.transactions.map((transaction) => (
                <TransactionTableRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {data?.transactions.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Table Footer */}
        {data?.transactions.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
              <span className="text-gray-600">
                Showing {data?.transactions.length} of{" "}
                {data?.transactions.length} transactions
              </span>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  Total Revenue: $
                  {data?.transactions
                    .reduce((sum, t) => sum + t.total, 0)
                    .toFixed(2)}
                </span>
                <span className="flex items-center gap-1">
                  Items Sold:{" "}
                  {data?.transactions.reduce(
                    (sum, t) =>
                      sum + t.items.reduce((s, i) => s + i.quantity, 0),
                    0,
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Details Modal */}
        {false && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Receipt size={22} className="text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Transaction Details
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedTransaction(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                {/* Transaction Header */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Transaction ID
                      </p>
                      <p className="font-mono text-sm font-medium text-gray-900">
                        {selectedTransaction.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Date & Time
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedTransaction.date} at {selectedTransaction.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Customer
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedTransaction.customer}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Cashier</p>
                      <p className="text-sm text-gray-900">
                        {selectedTransaction.cashier}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <h4 className="font-semibold text-gray-900 mb-3">Items</h4>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Product
                        </th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">
                          SKU
                        </th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">
                          Qty
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                          Price
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedTransaction.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-4 py-2 text-sm text-center font-mono text-gray-500">
                            {item.sku}
                          </td>
                          <td className="px-4 py-2 text-sm text-center">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-2 text-sm text-right">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-2 text-sm text-right font-medium">
                            ${item.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${selectedTransaction.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (12%)</span>
                        <span>${selectedTransaction.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
                        <span>Total</span>
                        <span className="text-blue-600">
                          ${selectedTransaction.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getPaymentIcon(selectedTransaction.paymentMethod)}
                      <span className="text-sm text-gray-600 capitalize">
                        Paid via {selectedTransaction.paymentMethod}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      Status: Completed
                    </span>
                  </div>
                </div>

                {selectedTransaction.notes && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-xs text-yellow-700">
                      Note: {selectedTransaction.notes}
                    </p>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedTransaction(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Printer size={16} />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionTable;
