export const ChartCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm animate-pulse">
      {/* Chart title skeleton */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4 md:mb-6"></div>

      {/* Simple chart area skeleton */}
      <div className="h-64 md:h-80 bg-gray-100 rounded-lg relative overflow-hidden">
        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </div>
  );
};
