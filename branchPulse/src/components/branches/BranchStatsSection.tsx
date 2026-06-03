import StatsCards from "../StatsCards";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData, formatPesoShort } from "../../lib/utils";
import type { SummaryStatType } from "../../lib/types";
import { Activity, Boxes, Building2, DollarSign } from "lucide-react";

type StatsData = {
  totalBranches: number;
  totalSales: number;
  totalStocks: number;
};

const BranchStatsSection = () => {
  const { data } = useSuspenseQuery<StatsData>({
    queryKey: ["branches-stats"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/branches-stats`),
  });

  const summaryStats: SummaryStatType[] = [
    {
      title: "Total Branches",
      value: data?.totalBranches ?? 0,
      subtitle: "21 Active",
      subtitleColor: "text-green-600",
      icon: Building2,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Sales",
      value: formatPesoShort(data?.totalSales ?? 0),
      subtitle: "+12.5% from last month",
      subtitleColor: "text-green-600",
      icon: DollarSign,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Inventory",
      value: data?.totalStocks ?? 0,
      subtitle: "Units across branches",
      subtitleColor: "text-gray-400",
      icon: Boxes,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Avg Productivity",
      value: "87%",
      subtitle: "Across all branches",
      subtitleColor: "text-gray-400",
      icon: Activity,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  console.log(summaryStats);

  return <StatsCards summaryStats={summaryStats} />;
};

export default BranchStatsSection;
