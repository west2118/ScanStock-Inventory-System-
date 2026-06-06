import Modal from "../UI/Modal";
import type { StockAdjustmentType } from "../../../utils/types";
import { capitalizeFirst, dateFormatter } from "../../../utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type StockAdjustmentNewModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedStockAdjustment: StockAdjustmentType | null;
};

const StockAdjustmentNewModal = ({
  isModalOpen,
  isCloseModal,
  selectedStockAdjustment,
}: StockAdjustmentNewModalProps) => {
  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:5001/api/stock-adjustments/${selectedStockAdjustment?.id}/approve`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Create Product Failed");
      }

      return data;
    },

    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["stock-adjustments-data"] });
    },

    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    productMutation.mutate();
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="New Stock Adjustment"
      width="max-w-2xl"
    >
      <form onSubmit={handleSubmitForm}>
        <div>
          {/* Header Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-medium text-gray-900">
                {selectedStockAdjustment?.createdAt
                  ? dateFormatter(selectedStockAdjustment?.createdAt)
                  : ""}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Status</p>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full mt-1 ${
                  selectedStockAdjustment?.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : selectedStockAdjustment?.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {capitalizeFirst(selectedStockAdjustment?.status ?? "")}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Created By</p>
              <p className="text-sm font-medium text-gray-900">
                {selectedStockAdjustment?.createdByName}
              </p>
            </div>
          </div>

          {/* Reason & Reference */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-xs text-gray-500">Reason</p>
                <p className="text-sm text-gray-900">
                  {selectedStockAdjustment?.reason}
                </p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <h4 className="font-semibold text-gray-900 mb-3">
            Products Adjusted
          </h4>
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
                {selectedStockAdjustment?.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-3 text-sm text-gray-900">
                      {item.productName}
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-500 font-mono">
                      {item.id}
                    </td>
                    <td className="py-2 px-3 text-center text-sm text-gray-600">
                      {0}+
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span
                        className={`text-sm font-bold ${item.adjustmentType === "IN" ? "text-green-600" : "text-red-600"}`}
                      >
                        {item.adjustmentType === "IN" ? "+" : "-"}
                        {item.quantity}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center text-sm font-medium text-gray-900">
                      {0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Summary */}
          <div className="mt-4 flex justify-end">
            <div className="bg-gray-50 rounded-lg p-3 w-64">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Products:</span>
                <span className="font-medium text-gray-900">
                  {selectedStockAdjustment?.items.length}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Total Quantity:</span>
                {/* <span
                className={`font-bold ${selectedStockAdjustment?.type === "add" ? "text-green-600" : "text-red-600"}`}
              > */}
                <span className={`font-bold text-gray-600`}>
                  {/* {selectedStockAdjustment?.type === "add" ? "+" : "-"} */}
                  {selectedStockAdjustment?.items.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 pt-4 flex gap-3 mt-6">
          <button
            onClick={isCloseModal}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          {selectedStockAdjustment?.status === "pending" && (
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Approve Adjustment
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default StockAdjustmentNewModal;
