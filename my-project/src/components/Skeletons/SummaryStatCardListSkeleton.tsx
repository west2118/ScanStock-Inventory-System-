const SummaryStatCardListSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
      <div className="flex items-center justify-between mb-2">
        {/* Icon skeleton */}
        <div className="w-5 h-5 bg-gray-200 rounded-md" />
        {/* Title skeleton */}
        <div className="h-3 bg-gray-200 rounded w-16" />
      </div>

      {/* Value skeleton */}
      <div className="h-8 bg-gray-200 rounded w-24 mt-1" />

      {/* Subtitle skeleton */}
      <div className="h-3 bg-gray-200 rounded w-20 mt-2" />
    </div>
  );
};

export default SummaryStatCardListSkeleton;
