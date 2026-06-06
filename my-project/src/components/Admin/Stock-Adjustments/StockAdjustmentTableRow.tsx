import {
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  MinusCircle,
  PlusCircle,
  Trash2,
  XCircle,
} from "lucide-react";
import type { StockAdjustmentType } from "../../../utils/types";
import { dateFormatter } from "../../../utils/utils";

type StockAdjustmentTableRowProps = {
  adj: StockAdjustmentType;
  handleViewStockAdjustment;
};

const StockAdjustmentTableRow = ({
  adj,
  handleViewStockAdjustment,
}: StockAdjustmentTableRowProps) => {
  const productCount = adj.items.length;

  const productNames = adj.items.map((item) => item.productName).join(", ");

  const totalQuantity = adj.items.reduce((sum, item) => sum + item.quantity, 0);

  const adjustmentType = adj.items[0]?.adjustmentType ?? "IN";

  const getTypeBadge = (type: "IN" | "OUT") => {
    if (type === "IN") {
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: <PlusCircle className="w-3 h-3" />,
        label: "Stock In",
      };
    }

    return {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <MinusCircle className="w-3 h-3" />,
      label: "Stock Out",
    };
  };

  const getStatusBadge = (
    status: "pending" | "approved" | "rejected" | "voided",
  ) => {
    switch (status) {
      case "approved":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: <CheckCircle className="w-3 h-3" />,
          label: "Approved",
        };

      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          icon: <Clock className="w-3 h-3" />,
          label: "Pending",
        };

      case "rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: <XCircle className="w-3 h-3" />,
          label: "Rejected",
        };

      case "voided":
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: <AlertCircle className="w-3 h-3" />,
          label: "Voided",
        };

      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: <AlertCircle className="w-3 h-3" />,
          label: status,
        };
    }
  };

  const typeBadge = getTypeBadge(adjustmentType);
  const statusBadge = getStatusBadge(adj.status);

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
            {productCount} product{productCount !== 1 ? "s" : ""}
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
            adjustmentType === "IN" ? "text-green-600" : "text-red-600"
          }`}
        >
          {adjustmentType === "IN" ? "+" : "-"}
          {totalQuantity}
        </span>
      </td>

      <td className="px-6 py-4 align-center">
        <p className="text-sm text-gray-700 line-clamp-2">{adj.reason}</p>
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
      </td>

      <td className="px-6 py-4 text-center align-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleViewStockAdjustment(adj)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>

          <button
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StockAdjustmentTableRow;
