import React from "react";

type SummaryStatCardProps = {
  summary: {
    title: string;
    value: number | string;
    subtitle?: string;

    icon?: React.ElementType;

    iconBg?: string;
    iconColor?: string;

    trendValue?: number | string;
    trendText?: string;
    trendType?: "positive" | "negative";
  };
};

const SummaryStatCard: React.FC<SummaryStatCardProps> = ({ summary }) => {
  const {
    title,
    value,
    subtitle,
    icon: Icon,
    iconBg = "bg-blue-50",
    iconColor = "text-blue-600",
    trendValue,
    trendText,
    trendType = "positive",
  } = summary;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 ${iconBg} rounded-lg`}>
          {Icon && <Icon size={24} className={iconColor} />}
        </div>
        <span className="text-xs text-gray-400">{title}</span>
      </div>

      {/* Value */}
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>

      {/* Subtitle */}
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}

      {/* Trend */}
      {(trendValue !== undefined || trendText) && (
        <div
          className={`mt-3 flex items-center gap-1 text-xs ${
            trendType === "positive" ? "text-green-600" : "text-red-600"
          }`}
        >
          <span>
            {trendValue} {trendText}
          </span>
        </div>
      )}
    </div>
  );
};

export default SummaryStatCard;
