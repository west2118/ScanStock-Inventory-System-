const StatsCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div>
              {/* Title Skeleton - matches text-sm text-gray-500 */}
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>

              {/* Value Skeleton - matches text-2xl font-bold text-gray-900 */}
              <div className="h-7 bg-gray-200 rounded w-32 mb-2"></div>

              {/* Subtitle Skeleton - matches text-xs mt-1 */}
              <div className="h-3 bg-gray-200 rounded w-28"></div>
            </div>

            {/* Icon Skeleton - matches p-3 rounded-xl */}
            <div className="p-3 bg-gray-100 rounded-xl">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCardsSkeleton;
