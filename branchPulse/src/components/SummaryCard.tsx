import type { SummaryStatType } from "../lib/types";

const SummaryCard = ({ stat }: { stat: SummaryStatType }) => {
  const Icon = stat.icon;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{stat.title}</p>

          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>

          <p className={`text-xs mt-1 ${stat.subtitleColor}`}>
            {stat.subtitle}
          </p>
        </div>

        <div className={`p-3 rounded-xl ${stat.bgColor}`}>
          <Icon className={`w-6 h-6 ${stat.iconColor}`} />
        </div>
      </div>
    </div>
  );
};
export default SummaryCard;
