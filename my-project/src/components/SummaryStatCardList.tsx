import type { LucideIcon } from "lucide-react";

type SummaryStatCardListProps = {
  summary: {
    title: string;
    value: number | string;
    subtitle: string;
    icon: LucideIcon;
    iconColor: string;
  };
};

const SummaryStatCardList = ({ summary }: SummaryStatCardListProps) => {
  const {
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor = "text-blue-500",
  } = summary;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-2">
        <Icon size={20} className={iconColor} />
        <span className="text-xs text-gray-400">{title}</span>
      </div>

      <p className="text-2xl font-bold text-gray-900">{value}</p>

      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
};

export default SummaryStatCardList;
