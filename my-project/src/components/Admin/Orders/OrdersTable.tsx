import React, { useState } from "react";
import OrdersTableRow from "./OrdersTableRow";
import { Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { OrderType } from "../../../types/order.types";
import type { PaginationType } from "../../../utils/types";
import Pagination from "../Pagination";
import TableRowSkeleton from "../Skeletons/TableRowSkeleton";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../../../utils/utils";
import OrdersFilters from "./OrdersFilters";
import OrdersTab from "../../store/Orders/OrdersTab";

type OrdersTableProps = {
  dispatch: React.Dispatch<any>;
  statsData: any;
};

const OrdersTable = ({
  dispatch,
  statsData,
}: OrdersTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "all";
  const search = searchParams.get("search") || "";
  const payment = searchParams.get("payment") || "all";
  const date = searchParams.get("date") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const setActiveTab = (tab: string) => {
    setSearchParams((prev) => {
      prev.set("tab", tab);
      return prev;
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prev) => {
      if (value && value !== "all" && value !== "") {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      if (key !== "page") prev.set("page", "1");
      return prev;
    });
  };

  const setPage = (newPage: number) => handleFilterChange("page", newPage.toString());
  const setLimit = (newLimit: number) => handleFilterChange("limit", newLimit.toString());

  const {
    data = [],
    isLoading,
  } = useQuery({
    queryKey: ["branch-orders-data", activeTab, search, payment, date, page, limit],
    queryFn: fetchData(
      `http://localhost:5001/api/orders/branch?status=${activeTab}&search=${encodeURIComponent(search)}&payment=${encodeURIComponent(payment)}&date=${encodeURIComponent(date)}&page=${page}&limit=${limit}`
    ),
  });

  const orders: OrderType[] = data?.orders;
  const pagination: PaginationType = data?.pagination;

  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders?.map((order) => order.id) || []);
    }
    setSelectAll(!selectAll);
  };

  return (
    <>
      <OrdersFilters
        search={search}
        payment={payment}
        date={date}
        onFilterChange={handleFilterChange}
      />

      <OrdersTab setActiveTab={setActiveTab} activeTab={activeTab} stats={statsData} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-8 py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Order ID / Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Products
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Total
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Payment
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <TableRowSkeleton columns={8} rows={3} />
              ) : (
                orders?.map((order) => (
                  <OrdersTableRow
                    key={order.id}
                    order={order}
                    selectedOrders={selectedOrders}
                    dispatch={dispatch}
                  />
                ))
              )}
            </tbody>
            {pagination && setPage && setLimit && (
              <Pagination
                limit={pagination.limit}
                page={pagination.page}
                total={pagination.total}
                totalPages={pagination.totalPages}
                setPage={setPage}
                setLimit={setLimit}
                col={8}
              />
            )}
          </table>
        </div>

        {!isLoading && orders?.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersTable;
