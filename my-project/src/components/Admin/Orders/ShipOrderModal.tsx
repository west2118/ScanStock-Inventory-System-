import React, { useState } from "react";
import Modal from "../UI/Modal";
import { Truck } from "lucide-react";
import { useShipOrder } from "../../store/Hooks/useShipOrder";

type ShipOrderModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  orderId: number;
  orderNumber: number;
};

const ShipOrderModal = ({
  isModalOpen,
  isCloseModal,
  orderId,
  orderNumber,
}: ShipOrderModalProps) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [courierName, setCourierName] = useState("");
  const shipOrderMutation = useShipOrder();

  const handleShipOrder = () => {
    shipOrderMutation.mutate(
      { orderId, trackingNumber, courierName },
      {
        onSuccess: () => {
          isCloseModal();
          setTrackingNumber("");
          setCourierName("");
        },
      }
    );
  };

  const handleClose = () => {
    isCloseModal();
    setTrackingNumber("");
    setCourierName("");
  };

  return (
    <Modal
      title="Ship Order"
      isModalOpen={isModalOpen}
      isCloseModal={handleClose}
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-lg bg-purple-50 p-4">
          <Truck className="h-5 w-5 text-purple-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">Ship this order?</p>
            <p className="text-sm text-gray-600 mt-1">
              Add the courier details before marking order #{orderNumber} as shipped.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tracking Number
          </label>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Courier Name
          </label>
          <input
            type="text"
            value={courierName}
            onChange={(e) => setCourierName(e.target.value)}
            placeholder="e.g. J&T Express, LBC, 2GO"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleShipOrder}
            disabled={
              !trackingNumber.trim() ||
              !courierName.trim() ||
              shipOrderMutation.isPending
            }
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {shipOrderMutation.isPending ? "Shipping..." : "Ship Order"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShipOrderModal;
