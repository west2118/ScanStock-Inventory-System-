import type { LucideIcon } from "lucide-react";
import SummaryStatCardList from "./SummaryStatCardList";

const SummaryStatsCard = ({
  summaryCards,
}: {
  summaryCards: {
    title: string;
    value: number | string;
    subtitle: string;
    icon: LucideIcon;
    iconColor: string;
  }[];
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {summaryCards.map((summary) => (
        <SummaryStatCardList key={summary.title} summary={summary} />
      ))}
    </div>
  );
};

export default SummaryStatsCard;
