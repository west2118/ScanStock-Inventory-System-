import { Trophy } from "lucide-react";
import PodiumCard from "./PodiumCard";

const PodiumSection = ({
  branchPerformanceRanking,
}: {
  branchPerformanceRanking: {
    avgTicket: string;
    branchCode: string;
    employeeCount: number;
    growth: number;
    name: string;
    productivity: string;
    rank: string;
    region: string;
    totalSales: number;
    totalTickets: number;
  }[];
}) => {
  const firstRank = branchPerformanceRanking.find(
    (branch) => Number(branch.rank) === 1,
  );
  const secondRank = branchPerformanceRanking.find(
    (branch) => Number(branch.rank) === 2,
  );
  const thirdRank = branchPerformanceRanking.find(
    (branch) => Number(branch.rank) === 3,
  );

  return (
    <div className="bg-linear-to-r from-gray-700 to-gray-800 rounded-2xl py-8 px-6 text-white mb-6 shadow-md">
      <h3 className="text-xl font-semibold mb-10 flex items-center justify-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-400" />
        Top Performing Branches
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <PodiumCard
          place={2}
          name={secondRank?.name ?? ""}
          sales={secondRank?.totalSales ?? 0}
          productivity={Number(secondRank?.productivity)}
        />
        <PodiumCard
          place={1}
          name={firstRank?.name ?? ""}
          sales={firstRank?.totalSales ?? 0}
          productivity={Number(firstRank?.productivity)}
        />
        <PodiumCard
          place={3}
          name={thirdRank?.name ?? ""}
          sales={thirdRank?.totalSales ?? 0}
          productivity={Number(thirdRank?.productivity)}
        />
      </div>
    </div>
  );
};

export default PodiumSection;
