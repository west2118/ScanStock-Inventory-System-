import { FileText } from "lucide-react";
import {
  capitalizeFirst,
  dateFormatter,
  getMovementUI,
  timeFormatter,
} from "../../utils/utils";
import type { InventoryMovementType } from "../../utils/types";

type StockMovementTableRowProps = {
  movement: InventoryMovementType;
  handleSelectMovement: (movementId: number) => void;
};

const StockMovementTableRow = ({
  movement,
  handleSelectMovement,
}: StockMovementTableRowProps) => {
  const movementUI = getMovementUI(movement.type);
  const Icon = movementUI.icon;

  return (
    <tr key={movement.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-gray-900">
            {dateFormatter(movement.createdAt)}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {timeFormatter(movement.createdAt)}
          </p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">{movement.productName}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
            movementUI.className
          }`}
        >
          <Icon size={12} />
          {movementUI.label}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className={`text-sm font-bold ${movementUI.textColor}`}>
          {movement.type === "IN" ? "+" : "-"}
          {movement.quantity}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="text-sm">
          <span className="text-gray-500">{movement.beforeStock}</span>
          <span className="mx-1 text-gray-400">→</span>
          <span
            className={`font-medium ${movement.afterStock <= 10 ? "text-red-600" : "text-gray-900"}`}
          >
            {movement.afterStock}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm text-gray-900">{movement.handledByName}</p>
          <p className="text-xs text-gray-500">
            {capitalizeFirst(movement.handledByRole)}
          </p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm text-gray-600">{movement.reference}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => handleSelectMovement(movement?.id)}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="View Details"
        >
          <FileText size={16} />
        </button>
      </td>
    </tr>
  );
};

export default StockMovementTableRow;
