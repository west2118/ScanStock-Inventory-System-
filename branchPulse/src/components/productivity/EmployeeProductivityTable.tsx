import { capitalizeFirst, pesoFormatter } from "../../lib/utils";

const EmployeeProductivityTable = ({
  employeePerformance,
}: {
  employeePerformance: {
    id: number;
    branchName: string;
    employeeName: string;
    productivity: string;
    role: string;
    totalSales: number;
    totalTickets: number;
  }[];
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Employee Performance Rankings
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Showing {employeePerformance.length} employees
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
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
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                Tickets
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                Productivity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employeePerformance.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {employee.employeeName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {employee.employeeName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {employee.branchName}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {employee.role
                    .replace("_", " ")
                    .split(" ")
                    .map((l: string) => capitalizeFirst(l))
                    .join(" ")}
                </td>
                <td className="py-3 px-4 text-right">
                  <p className="font-semibold text-gray-900">
                    {pesoFormatter.format(employee.totalSales)}
                  </p>
                  {/* <p className="text-xs text-gray-400">
                    Target: ₱{employee.target.toLocaleString()}
                  </p> */}
                </td>
                <td className="py-3 px-4 text-right text-gray-600">
                  {employee.totalTickets}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          Number(employee.productivity) >= 90
                            ? "bg-green-500"
                            : Number(employee.productivity) >= 80
                              ? "bg-blue-500"
                              : Number(employee.productivity) >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }`}
                        style={{ width: `${employee.productivity}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {employee.productivity}%
                    </span>
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

export default EmployeeProductivityTable;
