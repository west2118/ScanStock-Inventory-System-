import { Check, Eye, X } from "lucide-react";
import type { StockAdjustmentType } from "../../../utils/types";
import { dateFormatter } from "../../../utils/utils";
import TypeBadge from "../Badges/TypeBadge";
import StatusBadge from "../Badges/StatusBadge";

type StockAdjustmentTableRowProps = {
  adj: StockAdjustmentType;
  handleViewStockAdjustment: (StockAdjustment: StockAdjustmentType) => void;
  handleApproveStockAdjustment: (StockAdjustment: StockAdjustmentType) => void;
  handleRejectStockAdjustment: (StockAdjustment: StockAdjustmentType) => void;
};

const StockAdjustmentTableRow = ({
  adj,
  handleViewStockAdjustment,
  handleApproveStockAdjustment,
  handleRejectStockAdjustment,
}: StockAdjustmentTableRowProps) => {
  const productCount = adj.items.length;

  const productNames =
    adj.items.length > 1
      ? `${adj.items[0].productName} and ${adj.items.length - 1} more`
      : adj.items[0]?.productName || "-";

  const totalQuantity = adj.items.reduce((sum, item) => sum + item.quantity, 0);

  const typeBadge = TypeBadge(adj.adjustmentType);
  const statusBadge = StatusBadge(adj.status);

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-6 py-4 align-center">
        <div>
          <p className="font-mono text-sm font-medium text-gray-900">
            #{adj.id}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {dateFormatter(adj.createdAt)}
          </p>
        </div>
      </td>

      <td className="px-6 py-4 align-center">
        <div>
          <p className="text-sm text-gray-900 font-medium">
            {productCount} Product{productCount !== 1 ? "s" : ""}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
            {productNames}
          </p>
        </div>
      </td>

      <td className="px-6 py-4 text-center align-center">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${typeBadge.bg} ${typeBadge.text}`}
        >
          {typeBadge.icon}
          {typeBadge.label}
        </span>
      </td>

      <td className="px-6 py-4 text-center align-center">
        <span
          className={`text-sm font-bold ${
            adj.adjustmentType === "IN" ? "text-green-600" : "text-red-600"
          }`}
        >
          {adj.adjustmentType === "IN" ? "+" : "-"}
          {totalQuantity}
        </span>
      </td>

      <td className="px-6 py-4 align-center">
        <p className="text-sm text-gray-700 line-clamp-2">{adj.adjustmentReason}</p>
      </td>

      <td className="px-6 py-4 text-center align-center">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.text}`}
        >
          {statusBadge.icon}
          {statusBadge.label}
        </span>
      </td>

      <td className="px-6 py-4 align-center">
        <p className="text-sm text-gray-700">{adj.createdByName}</p>
        {adj.status !== "pending" && (
          <p className="text-xs text-gray-400">Handled By: {adj.handledBy}</p>
        )}
      </td>

      <td className="px-6 py-4 text-center align-middle">
        <div className="flex items-center justify-center gap-2">
          {adj.status === "pending" && (
            <>
              <button
                onClick={() => handleApproveStockAdjustment(adj)}
                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Approve"
              >
                <Check size={16} />
              </button>

              <button
                onClick={() => handleRejectStockAdjustment(adj)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Reject"
              >
                <X size={16} />
              </button>
            </>
          )}

          <button
            onClick={() => handleViewStockAdjustment(adj)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StockAdjustmentTableRow;
