import {
  FileText,
  Package,
  Barcode,
  TrendingUp,
  Layers,
  User,
  AlertTriangle,
} from "lucide-react";
import Modal from "../UI/Modal";
import { capitalizeFirst, dateFormatter, fetchData } from "../../utils/utils";
import type { InventoryMovementType } from "../../utils/types";
import { useQuery } from "@tanstack/react-query";
import ModalLoading from "../ModalLoading";

type StockMovementDetailModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedMovementId: number | null;
};

const StockMovementDetailModal = ({
  isModalOpen,
  isCloseModal,
  selectedMovementId,
}: StockMovementDetailModalProps) => {
  const {
    data: selectedMovement,
    isLoading,
    isError,
  } = useQuery<InventoryMovementType>({
    queryKey: ["product-data", selectedMovementId],
    queryFn: fetchData(
      `http://localhost:5001/api/stock-movement/${selectedMovementId}`,
    ),
    enabled: !!selectedMovementId,
  });

  console.log("Selected Movement: ", selectedMovement);

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Stock Movement Details"
      width="max-w-xl"
    >
      {isLoading ? (
        <ModalLoading title="Stock Movement" />
      ) : (
        <>
          <div className="space-y-6">
            {/* Movement Header */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText size={18} className="text-gray-500" />
                Stock Movement Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Movement ID
                  </label>
                  <p className="mt-1 font-mono text-sm text-gray-900">
                    #MV-{selectedMovement?.id.toString().padStart(6, "0")}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedMovement?.createdAt
                      ? dateFormatter(selectedMovement?.createdAt)
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package size={18} className="text-gray-500" />
                Product Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {selectedMovement?.productName}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </label>
                  <p className="mt-1 text-gray-900">
                    {selectedMovement?.category
                      ? selectedMovement.category.length > 3
                        ? capitalizeFirst(selectedMovement.category)
                        : selectedMovement.category.toUpperCase()
                      : ""}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Barcode
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Barcode size={14} className="text-gray-400" />
                    <p className="font-mono text-sm text-gray-900">
                      {selectedMovement?.barcode}
                    </p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </label>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    ₱{selectedMovement?.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Movement Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp size={18} className="text-gray-500" />
                Movement Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Movement Type
                  </label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        selectedMovement?.type === "IN"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedMovement?.type === "IN"
                        ? "Stock In"
                        : "Stock Out"}
                    </span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </label>
                  <p
                    className={`mt-1 text-2xl font-bold ${
                      selectedMovement?.type === "IN"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedMovement?.type === "IN" ? "+" : "-"}
                    {selectedMovement?.quantity}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </label>
                  <p className="mt-1 font-mono text-sm text-gray-900">
                    {selectedMovement?.reference || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Stock Levels */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Layers size={18} className="text-gray-500" />
                Stock Levels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Previous Stock
                  </label>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {selectedMovement?.beforeStock}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">units</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    New Stock
                  </label>
                  <p
                    className={`mt-1 text-2xl font-bold ${
                      (selectedMovement?.afterStock ?? 0) <= 10
                        ? "text-red-600"
                        : "text-gray-900"
                    }`}
                  >
                    {selectedMovement?.afterStock}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">units</p>
                </div>
              </div>
              {(selectedMovement?.afterStock ?? 0) <= 10 && (
                <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={14} className="text-orange-600" />
                    <span className="text-sm text-orange-700">
                      Stock is at critical level. Reorder recommended.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Handler Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User size={18} className="text-gray-500" />
                Handler Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Handled By
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <User size={14} className="text-gray-400" />
                    <div>
                      <p className="text-gray-900 font-medium">
                        {selectedMovement?.handledByName}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {selectedMovement?.handledByRole}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Handler ID
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    #{selectedMovement?.handledBy}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            {selectedMovement?.notes && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText size={18} className="text-gray-500" />
                  Notes
                </h3>
                <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedMovement?.notes}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={isCloseModal}
              className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-all"
            >
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default StockMovementDetailModal;
