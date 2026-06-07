import { X } from "lucide-react";
import type { ItemType } from "../../../utils/types";

type ScanItemCardProps = {
  item: ItemType;
  scanMode: "IN" | "OUT";
  removeItem: (id: number) => void;
  updateItem: (
    id: number,
    field: "quantity" | "remarks",
    value: number | string,
  ) => void;
};

const ScanItemCard = ({
  item,
  removeItem,
  updateItem,
  scanMode,
}: ScanItemCardProps) => {
  const newStock =
    scanMode === "IN"
      ? item.quantity + item.currentStock
      : item.currentStock - item.quantity;

  return (
    <div className="border border-gray-200 rounded-lg p-4 relative group">
      {/* Remove Button */}
      <button
        type="button"
        onClick={() => removeItem(item.id)}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
      >
        <X size={16} />
      </button>

      {/* Product Info */}
      <div className="mb-3 flex items-center gap-2">
        <p className="text-sm font-semibold text-gray-900">
          {item.productName}
        </p>

        <span className="text-gray-300">•</span>

        <p className="text-xs text-gray-500">SKU: {item.sku}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Quantity *
          </label>

          <input
            type="number"
            min={1}
            value={item.quantity}
            max={scanMode === "OUT" ? item.currentStock : undefined}
            onChange={(e) => {
              const quantity = Number(e.target.value);

              if (scanMode === "OUT" && quantity > item.currentStock) {
                updateItem(item.id, "quantity", item.currentStock);
                return;
              }

              updateItem(item.id, "quantity", quantity);
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Current Stock
          </label>

          <input
            type="text"
            readOnly
            value={item.currentStock}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            New Stock
          </label>

          <input
            type="text"
            readOnly
            value={newStock}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Reason (Optional)
        </label>

        <input
          type="text"
          value={item.remarks}
          onChange={(e) => updateItem(item.id, "remarks", e.target.value)}
          placeholder="e.g., Damaged, expired, restock"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
        />
      </div>
    </div>
  );
};

export default ScanItemCard;
