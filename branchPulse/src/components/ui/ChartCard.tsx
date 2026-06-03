import type { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

const ChartCard = ({ title, action, children }: ChartCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        {action && action}
      </div>

      {children}
    </div>
  );
};

export default ChartCard;
