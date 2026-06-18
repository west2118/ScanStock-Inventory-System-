import StatsCards from "../StatsCards";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData, formatPesoShort } from "../../lib/utils";
import type { SummaryStatType } from "../../lib/types";
import { DollarSign, Package, TrendingDown, TrendingUp } from "lucide-react";

type StatsData = {
  totalProducts: number;
  totalRevenue: number;
  bestSellingProduct: string;
  lowestSellingProduct: string;
};

const ProductStatsSection = () => {
  const { data } = useSuspenseQuery<StatsData>({
    queryKey: ["products-stats"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/admin/products-stats`),
  });

  const summaryStats: SummaryStatType[] = [
    {
      title: "Total Products",
      value: data?.totalProducts ?? 0,
      subtitle: "Products available",
      subtitleColor: "text-gray-500",
      icon: Package,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Revenue",
      value: formatPesoShort(data?.totalRevenue ?? 0),
      subtitle: "Across all products",
      subtitleColor: "text-green-600",
      icon: DollarSign,
      iconColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Best Selling Product",
      value: data?.bestSellingProduct.length > 20 ? data.bestSellingProduct.slice(0, 20) + "..." : data.bestSellingProduct ?? "-",
      subtitle: "Highest units sold",
      subtitleColor: "text-gray-500",
      icon: TrendingUp,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Lowest Selling Product",
      value: data?.lowestSellingProduct.length > 20 ? data.lowestSellingProduct.slice(0, 20) + "..." : data.lowestSellingProduct ?? "-",
      subtitle: "Lowest units sold",
      subtitleColor: "text-gray-500",
      icon: TrendingDown,
      iconColor: "text-red-500",
      bgColor: "bg-red-100",
    },
  ];

  return <StatsCards summaryStats={summaryStats} />;
};

export default ProductStatsSection;
