import {
  AlertTriangle,
  ArrowDownUp,
  Package,
  ShoppingCart,
} from "lucide-react";
import SummaryStatsCard from "../SummaryStatsCard";

const ProductSummaryStats = () => {
  const summaryCards = [
    {
      title: "Total Products",
      value: 12,
      subtitle: "products in inventory",
      icon: Package,
      iconColor: "text-blue-600",
    },
    {
      title: "Categories",
      value: 12,
      subtitle: "unique categories",
      icon: ShoppingCart,
      iconColor: "text-purple-600",
    },
    {
      title: "No Sales (7 Days)",
      value: 12,
      subtitle: "slow moving items",
      icon: AlertTriangle,
      iconColor: "text-yellow-600",
    },
    {
      title: "Low Stock",
      value: 12,
      subtitle: "needs restock",
      icon: ArrowDownUp,
      iconColor: "text-red-500",
    },
  ];

  return <SummaryStatsCard summaryCards={summaryCards} />;
};

export default ProductSummaryStats;
