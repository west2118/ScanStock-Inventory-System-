import StatsCardsSkeleton from "../skeletons/StatsCardsSkeleton";
import ChartCardSkeleton from "../skeletons/ChartCardSkeleton";

const InventorySkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      <StatsCardsSkeleton />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCardSkeleton />

        <ChartCardSkeleton />
      </div>

      {/* Stock Movement Chart & Branch Value Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCardSkeleton />

        <ChartCardSkeleton />
      </div>

      {/* Product Inventory Table */}
      <ChartCardSkeleton />
    </div>
  );
};

export default InventorySkeleton;
