import { Suspense } from "react";
import BranchLeaderboardsPage from "../components/leaderboards/LeaderboardPage";
import BranchLeaderboardSkeleton from "../components/leaderboards/BranchLeaderboardSkeleton";

const Leaderboard = () => {
  return (
    <Suspense fallback={<BranchLeaderboardSkeleton />}>
      <BranchLeaderboardsPage />
    </Suspense>
  );
};

export default Leaderboard;
