import { Activity } from "lucide-react";
import { formatNumber } from "../../utils/utils";

type InventoryProductsHealthProps = {
  data: {
    productName: string;
    sales: number;
    stock: number;
    stockValue: number;
    turnover: number;
  }[];
};

const InventoryProductsHealth = ({ data }: InventoryProductsHealthProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">
            Inventory Health Metrics
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.map((cat, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900">{cat.productName}</p>
              <span className="text-xs text-gray-500">{cat.stock} stocks</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Turnover Rate</span>
              <span className="font-medium text-gray-900">{cat.turnover}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${Math.min(Number(cat.turnover || 0), 100)}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Stock Value</span>
              <span className="font-medium text-gray-900">
                ${formatNumber(cat.stockValue)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryProductsHealth;
