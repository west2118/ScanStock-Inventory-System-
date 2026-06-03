import { Activity, Boxes, Building2, DollarSign } from "lucide-react";
import type { SummaryStatType } from "../../lib/types";
import StatsCards from "../StatsCards";
import { formatPesoShort } from "../../lib/utils";

type DashboardStatsSectionProps = {
  summaryStatsData: {
    totalBranches: number;
    totalSales: number;
    totalStocks: number;
  };
};

const DashboardStatsSection = ({
  summaryStatsData,
}: DashboardStatsSectionProps) => {
  const summaryStats: SummaryStatType[] = [
    {
      title: "Total Branches",
      value: summaryStatsData?.totalBranches ?? 0,
      subtitle: "21 Active",
      subtitleColor: "text-green-600",
      icon: Building2,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Sales",
      value: formatPesoShort(summaryStatsData?.totalSales ?? 0),
      subtitle: "+12.5% from last month",
      subtitleColor: "text-green-600",
      icon: DollarSign,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Inventory",
      value: summaryStatsData?.totalStocks ?? 0,
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

  return <StatsCards summaryStats={summaryStats} />;
};

export default DashboardStatsSection;
