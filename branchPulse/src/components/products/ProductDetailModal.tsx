import { Barcode, Tag, DollarSign, MapPin, Clock, AlignLeft, List, ImageIcon, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirst, dateFormatter, fetchData } from "../../lib/utils";
import type { ProductType } from "../../lib/types";
import ModalLoading from "../ModalLoading";
import Modal from "../ui/Modal";

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
  const { data: selectedProduct, isLoading } = useQuery<ProductType>({
    queryKey: ["product-data", selectedProductId],
    queryFn: fetchData(
      `${import.meta.env.VITE_API_URL}/admin/products/${selectedProductId}`,
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
                  {selectedProduct?.category && selectedProduct?.category.length > 3
                    ? capitalizeFirst(selectedProduct?.category)
                    : selectedProduct?.category?.toUpperCase()}
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

          {/* Location & Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin size={18} className="text-gray-500" />
              Status Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>{" "}
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

          {/* Detailed Information */}
          {(selectedProduct?.shortDescription || selectedProduct?.description || selectedProduct?.features) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Info size={18} className="text-gray-500" />
                Detailed Information
              </h3>
              <div className="border border-gray-200 rounded-lg p-4 shadow-xs">
                <div className="space-y-4">
                  {selectedProduct?.shortDescription && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Short Description</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedProduct.shortDescription}</p>
                    </div>
                  )}
                  {selectedProduct?.description && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description</label>
                      <div className="mt-1 text-sm text-gray-900 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selectedProduct.description }} />
                    </div>
                  )}
                  {selectedProduct?.features && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Features</label>
                      <div className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{selectedProduct.features}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Specifications */}
          {selectedProduct?.specifications && selectedProduct.specifications.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <List size={18} className="text-gray-500" />
                Specifications
              </h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-xs">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedProduct.specifications.map((spec: any, idx: number) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50 w-1/3 border-r border-gray-200">
                          {spec.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Images */}
          {selectedProduct?.images && selectedProduct.images.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ImageIcon size={18} className="text-gray-500" />
                Images
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {selectedProduct.images.map((img: any, idx: number) => (
                  <div key={idx} className="flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden relative shadow-xs">
                    {img.isPrimary && (
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded shadow">Primary</span>
                    )}
                    <img src={img.imageUrl} alt={`Product ${idx}`} className="h-32 w-32 object-cover bg-gray-50" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ProductDetailModal;
