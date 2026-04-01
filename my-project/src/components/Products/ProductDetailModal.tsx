import {
  X,
  Package,
  Barcode,
  Tag,
  DollarSign,
  MapPin,
  Layers,
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import Modal from "../UI/Modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  capitalizeFirst,
  dateFormatter,
  fetchData,
  getStockStatus,
} from "../../utils/utils";
import type { ProductType } from "../../utils/types";
import ModalLoading from "../ModalLoading";

type ProductDetailModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedProductId: number | null;
};

const ProductDetailModal = ({
  isModalOpen,
  isCloseModal,
  selectedProductId,
}: ProductDetailModalProps) => {
  const {
    data: selectedProduct,
    isLoading,
    isError,
  } = useQuery<ProductType>({
    queryKey: ["product-data", selectedProductId],
    queryFn: fetchData(
      `http://localhost:5001/api/product/${selectedProductId}`,
    ),
    enabled: !!selectedProductId,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getVatTypeLabel = (type: string) => {
    return type === "vatable" ? "Vatable (12%)" : "VAT Exempt";
  };

  console.log("Selected Product: ", selectedProduct);

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Product Detail"
      width="max-w-2xl"
    >
      {isLoading ? (
        <ModalLoading title="Product" />
      ) : (
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Tag size={18} className="text-gray-500" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {selectedProduct?.productName}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </label>
                <p className="mt-1 text-gray-900">
                  {" "}
                  {selectedProduct?.category &&
                  selectedProduct?.category.length > 3
                    ? capitalizeFirst(selectedProduct?.category)
                    : selectedProduct?.category.toUpperCase()}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </label>
                <p className="mt-1 font-mono text-sm text-gray-900">
                  {selectedProduct?.sku}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barcode
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Barcode size={14} className="text-gray-400" />
                  <p className="font-mono text-sm text-gray-900">
                    {selectedProduct?.barcode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Tax */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign size={18} className="text-gray-500" />
              Pricing & Tax
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </label>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  ₱{selectedProduct?.price.toLocaleString()}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VAT Type
                </label>
                <div className="mt-1">
                  <span
                    className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      selectedProduct?.vatType === "vatable"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {getVatTypeLabel(selectedProduct?.vatType ?? "")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Layers size={18} className="text-gray-500" />
              Stock Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </label>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {selectedProduct?.stock}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Low Stock Level
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedProduct?.stockLow} units
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Critical Stock Level
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedProduct?.stockCritical} units
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  High Stock Level
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedProduct?.stockHigh} units
                </p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Status
              </label>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`inline-flex px-3 py-1 text-sm rounded-full ${selectedProduct ? getStockStatus(selectedProduct).color : ""}`}
                >
                  {selectedProduct ? getStockStatus(selectedProduct).label : ""}
                </span>
                {(selectedProduct?.stock ?? 0) <=
                  (selectedProduct?.stockLow ?? 0) && (
                  <div className="flex items-center gap-1 text-orange-600">
                    <AlertTriangle size={14} />
                    <span className="text-xs">Reorder recommended</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Location & Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin size={18} className="text-gray-500" />
              Location & Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Storage Location
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin size={14} className="text-gray-400" />
                  <p className="text-gray-900">{selectedProduct?.location}</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </label>
                <div className="mt-1">
                  <span
                    className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(selectedProduct?.status ?? "")}`}
                  >
                    {capitalizeFirst(selectedProduct?.status ?? "")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock size={18} className="text-gray-500" />
              System Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProduct?.createdAt
                    ? dateFormatter(selectedProduct?.createdAt)
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ProductDetailModal;
