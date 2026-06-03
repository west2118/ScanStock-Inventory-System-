import { Activity, AlertTriangle } from "lucide-react";
import type { ChartData } from "../../lib/types";
import { pesoFormatter } from "../../lib/utils";

const LowestPerformingCard = ({
  lowPerforming,
}: {
  lowPerforming: ChartData;
}) => {
  return (
    <div className="bg-linear-to-r from-gray-400 to-gray-500 rounded-2xl p-6 text-white shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-300" />
            <p className="text-sm font-medium text-gray-100">
              Needs Improvement
            </p>
          </div>
          <h3 className="text-2xl font-bold">{lowPerforming.name}</h3>
          <div className="flex items-center gap-4 mt-3">
            <div>
              <p className="text-sm text-gray-100">Sales</p>
              <p className="text-lg font-semibold">
                {pesoFormatter.format(lowPerforming.value)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-100">Productivity</p>
              <p className="text-lg font-semibold">68%</p>
            </div>
            <div>
              <p className="text-sm text-gray-100">Growth</p>
              <p className="text-lg font-semibold">-5%</p>
            </div>
          </div>
        </div>
        <Activity className="w-16 h-16 text-gray-300 opacity-50" />
      </div>
    </div>
  );
};

export default LowestPerformingCard;
