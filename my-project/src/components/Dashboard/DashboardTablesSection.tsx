import DashboardLowStock from "./DashboardLowStock";
import DashboardRecentStock from "./DashboardRecentStock";
import type { DashboardChartsType } from "../../utils/types";

const DashboardTablesSection = ({
  chartsData,
}: {
  chartsData: DashboardChartsType;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Low Stock Items */}
      <DashboardLowStock data={chartsData?.lowStock ?? []} />

      {/* Recent Stock Movements */}
      <DashboardRecentStock data={chartsData?.recentMovements ?? []} />
    </div>
  );
};

export default DashboardTablesSection;
