import type { SummaryStatType } from "../lib/types";
import SummaryCard from "./SummaryCard";

const StatsCards = ({ summaryStats }: { summaryStats: SummaryStatType[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryStats.map((stat) => (
        <SummaryCard key={stat.title} stat={stat} />
      ))}
    </div>
  );
};

export default StatsCards;
