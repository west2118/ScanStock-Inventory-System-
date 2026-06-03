import { AlertCircle } from "lucide-react";
import PerformerCard from "./PerformerCard";
import NoPerformerCard from "./NoPerformerCard";

const NeedsImprovementCard = ({
  bottomPerformers,
}: {
  bottomPerformers: {
    id: number;
    branch: string;
    name: string;
    productivity: string;
    role: string;
    value: number;
  }[];
}) => {
  return (
    <div className="bg-linear-to-r from-red-500 to-red-400 rounded-2xl p-6 text-white shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-yellow-300" />
          <h3 className="text-lg font-semibold">Needs Improvement</h3>
        </div>
        <span className="text-sm text-red-100">Lowest productivity scores</span>
      </div>
      <div className="space-y-3">
        {bottomPerformers.map((emp, idx) => (
          <PerformerCard key={emp.id} emp={emp} idx={idx} />
        ))}

        {!bottomPerformers.length && <NoPerformerCard type="bottom" />}
      </div>
    </div>
  );
};

export default NeedsImprovementCard;
