import {
  Package,
  ArrowDownUp,
  AlertTriangle,
  ShoppingCart,
} from "lucide-react";
import SummaryStatsCard from "../SummaryStatsCard";
import { useMemo } from "react";
import type { DashboardSummaryType } from "../../../utils/types";

const DashboardSummarySection = ({
  summaryStats,
}: {
  summaryStats: DashboardSummaryType;
}) => {
  const summaryCards = useMemo(
    () => [
      {
        title: "Total Inventory",
        value: summaryStats.availableStock ?? 0,
        subtitle: "units in stock",
        icon: Package,
        iconColor: "text-blue-600",
      },
      {
        title: "Needs Attention",
        value: summaryStats.lowStocks ?? 0,
        subtitle: "items below minimum",
        icon: AlertTriangle,
        iconColor: "text-orange-500",
      },
      {
        title: "Stock In Today",
        value: `+${summaryStats.stockInToday ?? 0}`,
        subtitle: `${summaryStats.differenceChangeStockIn ?? 0} units`,
        icon: ShoppingCart,
        iconColor: "text-green-600",
      },
      {
        title: "Stock Out Today",
        value: `-${summaryStats.stockOutToday ?? 0}`,
        subtitle: `${summaryStats.differenceChangeStockOut ?? 0} units`,
        icon: ArrowDownUp,
        iconColor: "text-red-500",
      },
    ],
    [summaryStats],
  );

  return <SummaryStatsCard summaryCards={summaryCards} />;
};

export default DashboardSummarySection;
