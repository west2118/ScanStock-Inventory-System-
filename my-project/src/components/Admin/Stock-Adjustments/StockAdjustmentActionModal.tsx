import { useState } from "react";
import Modal from "../UI/Modal";
import type { StockAdjustmentType } from "../../../utils/types";
import { capitalizeFirst, dateFormatter } from "../../../utils/utils";

type Props = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  stockAdjustment: StockAdjustmentType | null;
  onAction: (reason: string) => void;
  isProcessing: boolean;
  actionType: "approve" | "reject";
};

const StockAdjustmentActionModal = ({
  isModalOpen,
  isCloseModal,
  stockAdjustment,
  onAction,
  isProcessing,
  actionType,
}: Props) => {
  const [reason, setReason] = useState("");

  const handleAction = () => {
    if (!reason.trim()) return;
    onAction(reason);
  };

  const isApprove = actionType === "approve";
  const title = isApprove ? "Approve Stock Adjustment" : "Reject Stock Adjustment";
  const actionText = isApprove ? "Approve Request" : "Reject Request";
  const processingText = isApprove ? "Approving Request..." : "Rejecting Request...";
  const btnClass = isApprove ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700";

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={title}
      width="max-w-2xl"
    >
      <div className="space-y-4">
        {/* 3-column grid without handledBy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-sm font-medium text-gray-900">
              {stockAdjustment?.createdAt
                ? dateFormatter(stockAdjustment?.createdAt)
                : ""}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Status</p>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full mt-1 ${
                stockAdjustment?.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : stockAdjustment?.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {capitalizeFirst(stockAdjustment?.status ?? "")}
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Created By</p>
            <p className="text-sm font-medium text-gray-900">
              {stockAdjustment?.createdByName}
            </p>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-xs text-gray-500">Adjustment Reason</p>
              <p className="text-sm text-gray-900">{stockAdjustment?.adjustmentReason}</p>
            </div>
          </div>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">Products Adjusted</h4>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">
                  Product
                </th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">
                  SKU
                </th>
                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-600">
                  Prev Stock
                </th>
                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-600">
                  Quantity
                </th>
                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-600">
                  New Stock
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stockAdjustment?.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-3 text-sm text-gray-900">
                    {item.productName}
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-500 font-mono">
                    {item.id}
                  </td>
                  <td className="py-2 px-3 text-center text-sm text-gray-600">
                    {item.prevStock}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`text-sm font-bold ${
                        stockAdjustment.adjustmentType === "IN"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stockAdjustment.adjustmentType === "IN" ? "+" : "-"}
                      {item.quantity}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center text-sm font-medium text-gray-900">
                    {item.newStock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="bg-gray-50 rounded-lg p-3 w-64">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Products:</span>
              <span className="font-medium text-gray-900">
                {stockAdjustment?.items.length}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Total Quantity:</span>
              <span
                className={`font-bold ${
                  stockAdjustment?.adjustmentType === "IN"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stockAdjustment?.adjustmentType === "IN" ? "+" : "-"}
                {stockAdjustment?.items.reduce(
                  (total, item) => total + item.quantity,
                  0,
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isApprove ? "Approval Reason" : "Rejection Reason"} <span className="text-red-500">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder={`Enter reason for ${isApprove ? "approving" : "rejecting"} this request...`}
            className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-${isApprove ? "green" : "red"}-500`}
          />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={isCloseModal}
          className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleAction}
          disabled={isProcessing || !reason.trim()}
          className={`px-4 py-2 text-white rounded-lg disabled:opacity-50 ${btnClass}`}
        >
          {isProcessing ? processingText : actionText}
        </button>
      </div>
    </Modal>
  );
};

export default StockAdjustmentActionModal;
