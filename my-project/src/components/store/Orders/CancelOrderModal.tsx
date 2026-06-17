import React, { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import Modal from "../../Admin/UI/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../utils/utils";


type CancelOrderModalProps = {
  selectedOrder: any;
  onClose: () => void;
  onConfirm: () => void;
};

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  selectedOrder,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState("Ordered by mistake");
  const queryClient = useQueryClient();

  const cancelMutation = useMutation({
    mutationFn: async () => {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/orders/${selectedOrder.id}/cancel`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel order");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders-data"] });
      queryClient.invalidateQueries({ queryKey: ["orders-stats"] });
      queryClient.invalidateQueries({ queryKey: ["orders-count"] });
      toast.success("Order cancelled successfully");
      onConfirm();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to cancel order");
    },
  });

  if (!selectedOrder) return null;

  return (
    <Modal
      isModalOpen={true}
      isCloseModal={onClose}
      title={
        <div>
          Cancel Order
          <p className="text-sm font-normal text-gray-500 mt-1">
            Are you sure you want to cancel this order?
          </p>
        </div>
      }
    >
      <div className="bg-yellow-50 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              Order will be cancelled
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Order ID: {selectedOrder.orderNumber || selectedOrder.id}
            </p>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reason for cancellation
        </label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        >
          <option value="Ordered by mistake">Ordered by mistake</option>
          <option value="Found a better price elsewhere">Found a better price elsewhere</option>
          <option value="Changed my mind">Changed my mind</option>
          <option value="Shipping takes too long">Shipping takes too long</option>
          <option value="Other reason">Other reason</option>
        </select>
      </div>
      <div className="mt-6 flex gap-3">
        <button
          onClick={onClose}
          disabled={cancelMutation.isPending}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Close
        </button>
        <button
          onClick={() => cancelMutation.mutate()}
          disabled={cancelMutation.isPending}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {cancelMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          Confirm Cancellation
        </button>
      </div>
    </Modal>
  );
};

export default CancelOrderModal;
