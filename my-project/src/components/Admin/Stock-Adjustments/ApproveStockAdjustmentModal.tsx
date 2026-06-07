import Modal from "../UI/Modal";
import type { StockAdjustmentType } from "../../../utils/types";

type Props = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  stockAdjustment: StockAdjustmentType | null;
  onApprove: () => void;
  isApproving: boolean;
};

const ApproveStockAdjustmentModal = ({
  isModalOpen,
  isCloseModal,
  stockAdjustment,
  onApprove,
  isApproving,
}: Props) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Approve Stock Adjustment"
      width="max-w-md"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Are you sure you want to approve this stock adjustment?
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

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Items:</span>
            <span className="font-medium text-gray-900">
              {stockAdjustment?.items.length ?? 0}
            </span>
          </div>
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
            onClick={onApprove}
            disabled={isApproving}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isApproving ? "Approving..." : "Approve"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ApproveStockAdjustmentModal;
