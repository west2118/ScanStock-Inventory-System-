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
import StockMovementTable from "../../components/Admin/Movements/StockMovementTable";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/utils";
import SummaryStatCardList from "../../components/Admin/SummaryStatCardList";
import SummaryStatCardListSkeleton from "../../components/Admin/Skeletons/SummaryStatCardListSkeleton";
import { useState } from "react";
import StockMovementSummaryStats from "../../components/Admin/Movements/StockMovementSummaryStats";

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
      value: 1247,
      subtitle: "all transactions",
      icon: Activity,
      iconColor: "text-blue-600",
    },
    {
      title: "Stock In",
      value: 856,
      subtitle: "items added",
      icon: ArrowDownCircle,
      iconColor: "text-green-600",
    },
    {
      title: "Stock Out",
      value: 391,
      subtitle: "items removed",
      icon: ArrowUpCircle,
      iconColor: "text-red-600",
    },
    {
      title: "Net Change",
      value: 465,
      subtitle: "inventory balance",
      icon: TrendingUp,
      iconColor: "text-green-600",
    },
  ];

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      {/* Summary Cards */}
      <StockMovementSummaryStats />

      <StockMovementTable />
    </main>
  );
};

export default Movements;
