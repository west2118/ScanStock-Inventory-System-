import StatsCardsSkeleton from "../skeletons/StatsCardsSkeleton";
import ChartCardSkeleton from "../skeletons/ChartCardSkeleton";

const SalesSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      <StatsCardsSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCardSkeleton />

        <ChartCardSkeleton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCardSkeleton />

        <ChartCardSkeleton />
      </div>

      {/* Best Selling Products Table */}
      <ChartCardSkeleton />
    </div>
  );
};

export default SalesSkeleton;
