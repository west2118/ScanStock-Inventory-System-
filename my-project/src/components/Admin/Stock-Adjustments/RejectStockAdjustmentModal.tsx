import { useState } from "react";
import Modal from "../UI/Modal";
import type { StockAdjustmentType } from "../../../utils/types";

type Props = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  stockAdjustment: StockAdjustmentType | null;
  onReject: (reason: string) => void;
  isRejecting: boolean;
};

const RejectStockAdjustmentModal = ({
  isModalOpen,
  isCloseModal,
  stockAdjustment,
  onReject,
  isRejecting,
}: Props) => {
  const [reason, setReason] = useState("");

  const handleReject = () => {
    if (!reason.trim()) return;
    
    onReject(reason);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Reject Stock Adjustment"
      width="max-w-md"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Please provide a reason for rejecting this stock adjustment.
        </p>

        <div className="rounded-lg bg-gray-50 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Reason:</span>
            <span className="font-medium text-gray-900">
              {stockAdjustment?.reason}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Type:</span>
            <span className="font-medium text-gray-900">
              {stockAdjustment?.adjustmentType}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rejection Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            placeholder="Enter rejection reason..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={isCloseModal}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleReject}
            disabled={isRejecting || !reason.trim()}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectStockAdjustmentModal;
