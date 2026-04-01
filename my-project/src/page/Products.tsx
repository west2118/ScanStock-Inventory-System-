import { useQuery } from "@tanstack/react-query";
import ProductTable from "../components/Products/ProductTable";
import { fetchData } from "../utils/utils";
import {
  AlertTriangle,
  ArrowDownUp,
  Package,
  ShoppingCart,
} from "lucide-react";
import SummaryStatCardList from "../components/SummaryStatCardList";
import SummaryStatCardListSkeleton from "../components/Skeletons/SummaryStatCardListSkeleton";

const Products = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products-summary-stats"],
    queryFn: fetchData(`http://localhost:5001/api/product/stats`),
  });

  const summaryCards = [
    {
      title: "Total Products",
      value: data?.totalProducts ?? 0,
      subtitle: "products in inventory",
      icon: Package,
      iconColor: "text-blue-600",
    },
    {
      title: "Categories",
      value: data?.totalCategories ?? 0,
      subtitle: "unique categories",
      icon: ShoppingCart,
      iconColor: "text-purple-600",
    },
    {
      title: "No Sales (7 Days)",
      value: data?.noSalesLast7Days ?? 0,
      subtitle: "slow moving items",
      icon: AlertTriangle,
      iconColor: "text-yellow-600",
    },
    {
      title: "Low Stock",
      value: data?.lowStockProducts ?? 0,
      subtitle: "needs restock",
      icon: ArrowDownUp,
      iconColor: "text-red-500",
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

      {/* Product Table */}
      <ProductTable />
    </main>
  );
};

export default Products;
