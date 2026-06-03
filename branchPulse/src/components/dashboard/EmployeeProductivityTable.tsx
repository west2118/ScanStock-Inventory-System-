import type { EmployeeProductivity } from "../../lib/types";
import { pesoFormatter } from "../../lib/utils";

const EmployeeProductivityTable = ({
  employeeProductivityOverview,
}: {
  employeeProductivityOverview: EmployeeProductivity[];
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 text-sm font-medium text-gray-500">
              Branch
            </th>
            <th className="text-center py-3 text-sm font-medium text-gray-500">
              Employees
            </th>
            <th className="text-right py-3 text-sm font-medium text-gray-500">
              Sales/Emp
            </th>
            <th className="text-right py-3 text-sm font-medium text-gray-500">
              Tickets/Emp
            </th>
          </tr>
        </thead>
        <tbody>
          {employeeProductivityOverview.map((item) => (
            <tr key={item.name} className="border-b border-gray-100">
              <td className="py-3 text-sm font-medium text-gray-700">
                {item.name}
              </td>
              <td className="py-3 text-sm text-center text-gray-600">
                {item.employees}
              </td>
              <td className="py-3 text-sm text-right text-gray-600">
                {pesoFormatter.format(item.salesPerEmployee)}
              </td>
              <td className="py-3 text-sm text-right text-gray-600">
                {item.ticketsPerEmployee}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeProductivityTable;
