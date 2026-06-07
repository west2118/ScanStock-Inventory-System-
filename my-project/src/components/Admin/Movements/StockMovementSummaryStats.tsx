import { ArrowDownCircle, ArrowUpCircle, TrendingUp } from "lucide-react";
import { Activity } from "react";
import SummaryStatsCard from "../SummaryStatsCard";

const StockMovementSummaryStats = () => {
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

  return <SummaryStatsCard summaryCards={summaryCards} />;
};

export default StockMovementSummaryStats;
