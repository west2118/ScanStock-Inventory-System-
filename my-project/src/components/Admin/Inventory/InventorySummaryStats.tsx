import SummaryStatsCard from "../SummaryStatsCard";
import { fetchData } from "../../../utils/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AlertCircle, AlertTriangle, Package, XCircle } from "lucide-react";

const InventorySummaryStats = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["inventory-summary-stats"],
    queryFn: fetchData(`http://localhost:5001/api/inventory/stats`),
  });

  const summaryCards = [
    {
      title: "In Stock",
      value: data?.inStock ?? 0,
      subtitle: "healthy inventory",
      icon: Package,
      iconColor: "text-green-600",
    },
    {
      title: "Low Stock",
      value: data?.lowStock ?? 0,
      subtitle: "needs restock soon",
      icon: AlertTriangle,
      iconColor: "text-yellow-600",
    },
    {
      title: "Critical Stock",
      value: data?.criticalStock ?? 0,
      subtitle: "urgent attention",
      icon: AlertCircle,
      iconColor: "text-orange-600",
    },
    {
      title: "Out of Stock",
      value: data?.outOfStock ?? 0,
      subtitle: "no inventory left",
      icon: XCircle,
      iconColor: "text-red-600",
    },
  ];

  return <SummaryStatsCard summaryCards={summaryCards} />;
};

export default InventorySummaryStats;
