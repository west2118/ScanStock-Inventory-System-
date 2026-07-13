import {
  Package,
  ArrowDownUp,
  AlertTriangle,
  ShoppingCart,
  DollarSign,
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
        title: "Today's Revenue",
        value: `$${(summaryStats.revenueToday ?? 0).toLocaleString()}`,
        subtitle: `${
          (summaryStats.differenceChangeRevenue ?? 0) >= 0 ? "+" : ""
        }${(summaryStats.differenceChangeRevenue ?? 0).toLocaleString()} vs yesterday`,
        icon: DollarSign,
        iconColor: "text-green-600",
      },
      {
        title: "Today's Items Sale",
        value: `${(summaryStats.itemsSaleToday ?? 0).toLocaleString()}`,
        subtitle: `${
          (summaryStats.differenceChangeItemsSale ?? 0) >= 0 ? "+" : ""
        }${(summaryStats.differenceChangeItemsSale ?? 0).toLocaleString()} vs yesterday`,
        icon: ArrowDownUp,
        iconColor: "text-blue-500",
      },
      {
        title: "Total Inventory",
        value: (summaryStats.availableStock ?? 0).toLocaleString(),
        subtitle: "units in stock",
        icon: Package,
        iconColor: "text-indigo-600",
      },
      {
        title: "Needs Attention",
        value: (summaryStats.lowStocks ?? 0).toLocaleString(),
        subtitle: "items below minimum",
        icon: AlertTriangle,
        iconColor: "text-orange-500",
      },
    ],
    [summaryStats],
  );

  return <SummaryStatsCard summaryCards={summaryCards} />;
};

export default DashboardSummarySection;
