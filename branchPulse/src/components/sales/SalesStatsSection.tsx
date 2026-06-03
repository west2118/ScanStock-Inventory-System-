import { DollarSign, TrendingUpIcon, Trophy, Zap } from "lucide-react";
import type { SummaryStatType } from "../../lib/types";
import StatsCards from "../StatsCards";
import { formatPesoShort } from "../../lib/utils";

type SalesStatsSectionProps = {
  summaryStatsData: {
    avgSalesPerBranch: number;
    bestPerformingBranch: {
      branchName: string;
      sales: number;
    };
    fastestGrowingBranch: {
      branchName: string;
      growthPercent: number;
    };
    totalSales: number;
  };
};

const SalesStatsSection = ({ summaryStatsData }: SalesStatsSectionProps) => {
  const summaryStats: SummaryStatType[] = [
    {
      title: "Total Revenue (YTD)",
      value: formatPesoShort(summaryStatsData.totalSales ?? 0),
      subtitle: "↑ +18.5% vs last year",
      subtitleColor: "text-green-600",
      icon: DollarSign,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Avg Revenue/Branch",
      value: formatPesoShort(summaryStatsData.avgSalesPerBranch ?? 0),
      subtitle: "↑ +12.3% vs last year",
      subtitleColor: "text-green-600",
      icon: TrendingUpIcon,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Best Performing Branch",
      value: summaryStatsData.bestPerformingBranch.branchName,
      subtitle: `${formatPesoShort(summaryStatsData.bestPerformingBranch.sales)} revenue`,
      subtitleColor: "text-green-600",
      icon: Trophy,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Fastest Growing",
      value: summaryStatsData.fastestGrowingBranch.branchName,
      subtitle: `↑ ${summaryStatsData.fastestGrowingBranch.growthPercent}% growth`,
      subtitleColor: "text-green-600",
      icon: Zap,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return <StatsCards summaryStats={summaryStats} />;
};

export default SalesStatsSection;
