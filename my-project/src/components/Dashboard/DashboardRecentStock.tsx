import { Truck } from "lucide-react";
import { dateFormatter, getMovementUI } from "../../utils/utils";

type DashboardRecentStockProps = {
  data: {
    id: number;
    createdAt: string;
    handledBy: string;
    productName: string;
    quantity: number;
    type: string;
  }[];
};

const DashboardRecentStock = ({ data }: DashboardRecentStockProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Truck size={18} className="text-gray-500" />
          <h3 className="font-semibold text-gray-900">Recent Movements</h3>
          <span className="ml-auto text-xs text-gray-400">
            Last 5 transactions
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((movement) => {
              const movementUI = getMovementUI(movement.type);
              const Icon = movementUI.icon;

              return (
                <tr key={movement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {movement.productName}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${movementUI.className}`}
                    >
                      <Icon size={12} />
                      {movementUI.label}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-sm text-center font-medium text-gray-900 ${movementUI.textColor}`}
                  >
                    {movement.type === "IN" ? "+" : "-"}
                    {movement.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {dateFormatter(movement.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {movement.handledBy}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardRecentStock;
