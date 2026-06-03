import { Package, Layers, AlertTriangle, Activity } from "lucide-react";
import StatsCards from "../StatsCards";
import { formatPesoShort } from "../../lib/utils";

const InventoryStatsSection = ({
  summaryStatsData,
}: {
  summaryStatsData: {
    totalInventoryValue: number;
    totalStocks: number;
    lowStockCount: number;
    inventoryTurnover: number;
  };
}) => {
  const summaryStats = [
    {
      title: "Total Inventory Value",
      value: formatPesoShort(summaryStatsData.totalInventoryValue ?? 0),
      subtitle: "↑ +8.5% vs last month",
      subtitleColor: "text-green-600",
      icon: Package,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Units in Stock",
      value: summaryStatsData.totalStocks ?? 0,
      subtitle: "Across all branches",
      subtitleColor: "text-gray-400",
      icon: Layers,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Low Stock Alerts",
      value: summaryStatsData.lowStockCount ?? 0,
      subtitle: `123 critical items`,
      subtitleColor: "text-yellow-600",
      icon: AlertTriangle,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Inventory Turnover",
      value: `${summaryStatsData.inventoryTurnover}x`,
      subtitle: "↑ +0.4 vs last quarter",
      subtitleColor: "text-green-600",
      icon: Activity,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return <StatsCards summaryStats={summaryStats} />;
};

export default InventoryStatsSection;
