import StatsCards from "../StatsCards";
import { Crown, DollarSign, TrendingUpIcon, Users } from "lucide-react";
import type { SummaryStatType } from "../../lib/types";
import { formatPesoShort } from "../../lib/utils";

type EmployeeProductivityStatsSectionProps = {
  summaryStatsData: {
    avgProductivity: string;
    topPerformer: string;
    totalEmployees: number;
    totalSales: string;
  };
};

const EmployeeProductivityStatsSection = ({
  summaryStatsData,
}: EmployeeProductivityStatsSectionProps) => {
  const summaryStats: SummaryStatType[] = [
    {
      title: "Total Employees",
      value: summaryStatsData.totalEmployees ?? 0,
      subtitle: "Across 8 branches",
      subtitleColor: "text-green-600",
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Avg Productivity",
      value: `${summaryStatsData.avgProductivity ?? 0}%`,
      subtitle: "+3.2% vs last month",
      subtitleColor: "text-green-600",
      icon: TrendingUpIcon,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Top Performer",
      value: summaryStatsData.topPerformer ?? "None",
      subtitle: "94% productivity",
      subtitleColor: "text-green-600",
      icon: Crown,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Total Sales (Employees)",
      value: formatPesoShort(Number(summaryStatsData.totalSales)) ?? 0,
      subtitle: "YTD employee contribution",
      subtitleColor: "text-gray-400",
      icon: DollarSign,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return <StatsCards summaryStats={summaryStats} />;
};

export default EmployeeProductivityStatsSection;
