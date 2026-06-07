import { Package, TrendingUp, TrendingDown, Clock } from "lucide-react";
import SummaryStatsCard from "../SummaryStatsCard";

const StockAdjustmentSummaryStats = () => {
  const summaryCards = [
    {
      title: "Total Adjustments",
      value: 248,
      subtitle: "transactions",
      icon: Package,
      iconColor: "text-blue-600",
    },
    {
      title: "Stock Additions",
      value: 1240,
      subtitle: "units added",
      icon: TrendingUp,
      iconColor: "text-green-600",
    },
    {
      title: "Stock Removals",
      value: 856,
      subtitle: "units removed",
      icon: TrendingDown,
      iconColor: "text-red-600",
    },
    {
      title: "Pending Approval",
      value: 18,
      subtitle: "awaiting review",
      icon: Clock,
      iconColor: "text-yellow-600",
    },
  ];

  return <SummaryStatsCard summaryCards={summaryCards} />;
};

export default StockAdjustmentSummaryStats;
