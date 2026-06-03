import StatsCardsSkeleton from "../skeletons/StatsCardsSkeleton";
import PerformingCardSkeleton from "../skeletons/PerformingCardSkeleton";
import ChartCardSkeleton from "../skeletons/ChartCardSkeleton";

const DashboardSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      <StatsCardsSkeleton />

      {/* Top & Lowest Performing Branches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PerformingCardSkeleton />

        <PerformingCardSkeleton />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCardSkeleton />

        <ChartCardSkeleton />
      </div>

      {/* Employee Productivity Overview & Branch Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCardSkeleton />

        <ChartCardSkeleton />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
