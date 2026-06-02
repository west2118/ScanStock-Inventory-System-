import SummaryStatCardListSkeleton from "./SummaryStatCardListSkeleton";

const StatsCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }, (_, index) => (
        <SummaryStatCardListSkeleton key={index} />
      ))}
    </div>
  );
};

export default StatsCardSkeleton;
