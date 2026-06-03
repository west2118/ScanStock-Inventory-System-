import StatsCardSkeleton from "../Skeletons/StatsCardSkeleton";
import { ChartCardSkeleton } from "../Skeletons/ChartCardSkeleton";
import TableCardSkeleton from "../Skeletons/TableCardSkeleton";

const DashboardSkeleton = () => {
  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <StatsCardSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCardSkeleton />
        <ChartCardSkeleton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCardSkeleton />
        <ChartCardSkeleton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TableCardSkeleton />
        <TableCardSkeleton />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
