import { Award } from "lucide-react";
import RankBadge from "../badges/RankBadge";
import { capitalizeFirst, formatPesoShort } from "../../lib/utils";

const EmployeeLeaderboardTable = ({
  employeeRankings,
}: {
  employeeRankings: {
    avgTicket: string;
    branchName: string;
    employeeName: string;
    id: number;
    productivity: string;
    rank: string;
    role: string;
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
              Top Performing Employees
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Ranked by productivity and sales performance
            </p>
          </div>
          <Award className="w-6 h-6 text-blue-500" />
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
                Employee
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Branch
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Position
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                Sales
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                Productivity
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                Tickets
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employeeRankings.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <RankBadge rank={Number(emp.rank)} />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {emp.employeeName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {emp.employeeName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{emp.branchName}</td>
                <td className="py-3 px-4 text-gray-600">
                  {emp.role
                    .replace("_", " ")
                    .split(" ")
                    .map((l: string) => capitalizeFirst(l))
                    .join(" ")}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900">
                  {formatPesoShort(emp.totalSales)}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          Number(emp.productivity) >= 90
                            ? "bg-green-500"
                            : Number(emp.productivity) >= 80
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }`}
                        style={{ width: `${emp.productivity}%` }}
                      />
                    </div>
                    <span className="text-sm">{emp.productivity}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center text-gray-600">
                  {emp.totalTickets}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeLeaderboardTable;
