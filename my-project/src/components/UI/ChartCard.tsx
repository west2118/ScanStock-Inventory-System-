import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  children?: React.ReactNode;
};

const DashboardCard = ({
  title,
  subtitle,
  icon: Icon,
  children,
}: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>

        {subtitle && <span className="text-xs text-gray-400">{subtitle}</span>}
      </div>

      <div className="flex-1 h-80">{children}</div>
    </div>
  );
};

export default DashboardCard;
