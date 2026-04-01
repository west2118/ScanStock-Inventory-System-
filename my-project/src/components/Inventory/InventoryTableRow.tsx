import { Eye, Plus, Minus } from "lucide-react";
import type { ProductType } from "../../utils/types";
import { capitalizeFirst, getStockStatus } from "../../utils/utils";

type InventoryTableRowProps = {
  item: ProductType;
  handleSelectProduct: (product: ProductType, action: "IN" | "OUT") => void;
};

const InventoryTableRow = ({
  item,
  handleSelectProduct,
}: InventoryTableRowProps) => {
  return (
    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">{item.productName}</p>
          <p className="text-xs text-gray-500 mt-0.5">ID: {item.id}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-mono text-gray-600">{item.sku}</p>
          <p className="text-xs text-gray-400 mt-0.5">{item.barcode}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
          {item.category.length > 3
            ? capitalizeFirst(item.category)
            : item.category.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <p className={`text-sm font-bold ${getStockStatus(item).textColor}`}>
            {item.stock} / {item.stockLow}
          </p>
          <span className="text-xs font-extralight">pcs</span>
        </div>

        <p className="text-[10px] text-gray-400 mt-0.5 text-right">
          Low: {item.stockLow ?? 0} | Critical: {item.stockCritical ?? 5} |
          High: {item.stockHigh ?? 20}
        </p>
      </td>
      <td className="px-6 py-4 text-center">
        <p className="text-sm text-gray-600">{item.location}</p>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-1">
          <span
            className={`inline-flex px-2 py-1 text-xs rounded-full ${getStockStatus(item).color}`}
          >
            {getStockStatus(item).label}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleSelectProduct(item, "OUT")}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Stock Out"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => handleSelectProduct(item, "IN")}
            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Stock In"
          >
            <Plus size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryTableRow;
