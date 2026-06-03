const PerformingCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-40 mb-3"></div>
          <div className="flex items-center gap-4 mt-3">
            <div>
              <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            <div>
              <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div>
              <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
        <div className="w-16 h-16 bg-gray-200 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default PerformingCardSkeleton;
