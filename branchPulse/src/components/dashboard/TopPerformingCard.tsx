import { Crown, Trophy } from "lucide-react";
import type { ChartData } from "../../lib/types";
import { pesoFormatter } from "../../lib/utils";

const TopPerformingCard = ({ topPerforming }: { topPerforming: ChartData }) => {
  return (
    <div className="bg-linear-to-r from-blue-500 to-blue-400 rounded-2xl p-6 text-white shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-yellow-300" />
            <p className="text-sm font-medium text-blue-100">
              Top Performing Branch
            </p>
          </div>
          <h3 className="text-2xl font-bold">{topPerforming.name}</h3>
          <div className="flex items-center gap-4 mt-3">
            <div>
              <p className="text-sm text-blue-100">Sales</p>
              <p className="text-lg font-semibold">
                {pesoFormatter.format(topPerforming.value)}
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Productivity</p>
              <p className="text-lg font-semibold">94%</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Growth</p>
              <p className="text-lg font-semibold">+18%</p>
            </div>
          </div>
        </div>
        <Trophy className="w-16 h-16 text-yellow-300 opacity-50" />
      </div>
    </div>
  );
};

export default TopPerformingCard;
