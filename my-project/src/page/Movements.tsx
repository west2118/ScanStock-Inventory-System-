// Movements.jsx - Inventory Movements History Page
import {
  Package,
  Plus,
  Minus,
  ShoppingCart,
  User,
  Download,
  Printer,
  XCircle,
  TrendingUp,
  RefreshCw,
  ArrowUpCircle,
  ArrowDownCircle,
  Activity,
} from "lucide-react";
import StockMovementTable from "../components/Movements/StockMovementTable";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/utils";
import SummaryStatCardList from "../components/SummaryStatCardList";
import SummaryStatCardListSkeleton from "../components/Skeletons/SummaryStatCardListSkeleton";
import { useState } from "react";

const Movements = () => {
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["movements-summary-stats"],
    queryFn: fetchData(`http://localhost:5001/api/movements/stats`),
  });

  const summaryCards = [
    {
      title: "Total Movements",
      value: data?.totalMovements ?? 0,
      subtitle: "all transactions",
      icon: Activity,
      iconColor: "text-blue-600",
    },
    {
      title: "Stock In",
      value: data?.totalStockIn ?? 0,
      subtitle: "items added",
      icon: ArrowDownCircle,
      iconColor: "text-green-600",
    },
    {
      title: "Stock Out",
      value: data?.totalStockOut ?? 0,
      subtitle: "items removed",
      icon: ArrowUpCircle,
      iconColor: "text-red-600",
    },
    {
      title: "Net Change",
      value: data?.totalNetChange ?? 0,
      subtitle: "inventory balance",
      icon: TrendingUp,
      iconColor:
        (data?.totalNetChange ?? 0) >= 0 ? "text-green-600" : "text-red-600",
    },
  ];

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SummaryStatCardListSkeleton key={index} />
            ))
          : summaryCards.map((summary) => (
              <SummaryStatCardList key={summary.title} summary={summary} />
            ))}
      </div>

      <StockMovementTable />
    </main>
  );
};

export default Movements;
