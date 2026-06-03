import { Trophy } from "lucide-react";
import TrendBadge from "../badges/TrendBadge";
import RankBadge from "../badges/RankBadge";
import { formatPesoShort, pesoFormatter } from "../../lib/utils";

const BranchRankingsTable = ({
  branchRankings,
}: {
  branchRankings: {
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
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Branch Performance Rankings
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Ranked by overall performance score
            </p>
          </div>
          <Trophy className="w-6 h-6 text-yellow-500" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Rank
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Branch
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                Sales (MTD)
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                Growth
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                Productivity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {branchRankings.map((branch, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <RankBadge rank={Number(branch.rank)} />
                </td>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-gray-900">{branch.name}</p>
                    <p className="text-xs text-gray-400">
                      {branch.branchCode} • {branch.region}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <p className="font-semibold text-gray-900">
                    {formatPesoShort(branch.totalSales)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {pesoFormatter.format(Number(branch.avgTicket))}/ticket
                  </p>
                </td>
                <td className="py-3 px-4 text-right">
                  <TrendBadge growth={branch.growth} />
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-green-500 h-1.5 rounded-full"
                        style={{ width: `${branch.productivity}%` }}
                      />
                    </div>
                    <span className="text-sm">{branch.productivity}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchRankingsTable;
