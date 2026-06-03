import { Crown } from "lucide-react";
import PerformerCard from "./PerformerCard";
import NoPerformerCard from "./NoPerformerCard";

const TopPerformersCard = ({
  topPerformers,
}: {
  topPerformers: {
    id: number;
    branch: string;
    name: string;
    productivity: string;
    role: string;
    value: number;
  }[];
}) => {
  return (
    <div className="bg-linear-to-r from-green-500 to-green-400 rounded-2xl p-6 text-white shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-300" />
          <h3 className="text-lg font-semibold">Top Performers</h3>
        </div>
        <span className="text-sm text-green-100">
          Highest productivity scores
        </span>
      </div>
      <div className="space-y-3">
        {topPerformers.map((emp, idx) => (
          <PerformerCard key={emp.id} emp={emp} idx={idx} />
        ))}

        {!topPerformers.length && <NoPerformerCard type="top" />}
      </div>
    </div>
  );
};

export default TopPerformersCard;
