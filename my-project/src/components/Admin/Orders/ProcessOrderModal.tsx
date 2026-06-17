import React from "react";
import Modal from "../UI/Modal";
import { Loader2, PackageCheck } from "lucide-react";
import { useProcessOrder } from "../../store/Hooks/useProcessOrder";

type ProcessOrderModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  orderId: number;
  orderNumber: number;
};

const ProcessOrderModal = ({
  isModalOpen,
  isCloseModal,
  orderId,
  orderNumber,
}: ProcessOrderModalProps) => {
  const processOrderMutation = useProcessOrder();

  const handleProcessOrder = () => {
    processOrderMutation.mutate(orderId);
    isCloseModal();
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Mark Order as Processing"
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
          <PackageCheck className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">Process this order?</p>
            <p className="text-sm text-gray-600 mt-1">
              This will move order #{orderNumber} from pending to processing.
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={isCloseModal}
            disabled={processOrderMutation.isPending}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleProcessOrder}
            disabled={processOrderMutation.isPending}
            className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processOrderMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProcessOrderModal;
