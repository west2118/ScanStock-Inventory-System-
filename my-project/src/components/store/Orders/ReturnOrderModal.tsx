import React from "react";
import Modal from "../../Admin/UI/Modal";

type ReturnOrderModalProps = {
  selectedOrder: any;
  onClose: () => void;
  onSubmit: () => void;
};

const ReturnOrderModal: React.FC<ReturnOrderModalProps> = ({
  selectedOrder,
  onClose,
  onSubmit,
}) => {
  if (!selectedOrder) return null;

  return (
    <Modal
      isModalOpen={true}
      isCloseModal={onClose}
      title={
        <div>
          Request Return/Refund
          <p className="text-sm font-normal text-gray-500 mt-1">
            Tell us why you want to return this order
          </p>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Return Reason
          </label>
          <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
            <option>Defective product</option>
            <option>Wrong item received</option>
            <option>Damaged during shipping</option>
            <option>Not as described</option>
            <option>Other reason</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Comments
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            placeholder="Please provide more details..."
          ></textarea>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Submit Request
        </button>
      </div>
    </Modal>
  );
};

export default ReturnOrderModal;
