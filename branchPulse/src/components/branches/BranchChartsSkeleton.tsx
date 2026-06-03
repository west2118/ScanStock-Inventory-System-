import ChartCardSkeleton from "../skeletons/ChartCardSkeleton";

const BranchChartsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Branch Sales Comparison Chart Skeleton */}
      <ChartCardSkeleton />

      {/* Branch Distribution by Region Chart Skeleton */}
      <ChartCardSkeleton />
    </div>
  );
};

export default BranchChartsSkeleton;
