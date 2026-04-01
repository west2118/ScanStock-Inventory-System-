import { AlertTriangle } from "lucide-react";
import { getStockStatus } from "../../utils/utils";

type DashboardLowStockProps = {
  data: {
    id: number;
    sku: string;
    productName: string;
    stock: number;
    stockCritical: number;
    stockLow: number;
  }[];
};

const DashboardLowStock = ({ data }: DashboardLowStockProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-orange-50">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-orange-500" />
          <h3 className="font-semibold text-gray-900">Low Stock Items</h3>
          <span className="ml-auto text-xs text-gray-400">
            Reorder recommended
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Min
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.productName}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.sku}
                </td>
                <td className="px-6 py-4 text-sm text-center font-bold text-red-600">
                  {item.stock}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-500">
                  {item.stockLow}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      getStockStatus(item).color
                    }`}
                  >
                    {getStockStatus(item).label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardLowStock;
