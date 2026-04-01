import { Package, AlertTriangle, XCircle, AlertCircle } from "lucide-react";
import InventoryTable from "../components/Inventory/InventoryTable";
import { fetchData } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";
import SummaryStatCardList from "../components/SummaryStatCardList";
import SummaryStatCardListSkeleton from "../components/Skeletons/SummaryStatCardListSkeleton";

const Inventory = () => {
  const { data, isLoading, isError, refetch } = useQuery({
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

      <InventoryTable />
    </main>
  );
};

export default Inventory;
