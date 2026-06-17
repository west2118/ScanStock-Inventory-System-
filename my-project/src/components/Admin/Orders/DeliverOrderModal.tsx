import React from "react";
import Modal from "../UI/Modal";
import { CheckCircle } from "lucide-react";
import { useDeliverOrder } from "../../store/Hooks/useDeliverOrder";

type DeliverOrderModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  orderId: number;
  orderNumber: number;
};

const DeliverOrderModal = ({
  isModalOpen,
  isCloseModal,
  orderId,
  orderNumber,
}: DeliverOrderModalProps) => {
  const deliverOrderMutation = useDeliverOrder();

  const handleDeliverOrder = () => {
    deliverOrderMutation.mutate(orderId, {
      onSuccess: () => {
        isCloseModal();
      },
    });
  };

  return (
    <Modal
      title="Mark Order as Delivered"
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">
              Mark this order as delivered?
            </p>
            <p className="text-sm text-gray-600 mt-1">
              This will move order #{orderNumber} from shipped to
              delivered.
            </p>
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
            onClick={handleDeliverOrder}
            disabled={deliverOrderMutation.isPending}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {deliverOrderMutation.isPending ? "Updating..." : "Mark Delivered"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeliverOrderModal;
