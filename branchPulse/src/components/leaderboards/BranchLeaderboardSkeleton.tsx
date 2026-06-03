import ChartCardSkeleton from "../skeletons/ChartCardSkeleton";
import TopPerformingBranchesSkeleton from "./PodiumSkeleton";

const BranchLeaderboardSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      {/* Podium Section - Top 3 Branches */}
      <TopPerformingBranchesSkeleton />

      {/* Branch Rankings Table */}
      <ChartCardSkeleton />

      {/* Employee Leaderboard */}
      <ChartCardSkeleton />

      {/* Best Selling Products Rankings */}
      <ChartCardSkeleton />
    </div>
  );
};

export default BranchLeaderboardSkeleton;
