import { Package } from "lucide-react";
import {
  capitalizeFirst,
  getStockStatus,
  pesoFormatter,
} from "../../utils/utils";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type ScanScannedProductDetailProps = {
  scanMode: any;
  scannedProduct: any;
  setScannedProduct: any;
};

const ScanScannedProductDetail = ({
  scanMode,
  scannedProduct,
  setScannedProduct,
}: ScanScannedProductDetailProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { formData, handleChange } = useForm({
    quantity: 0,
    reference: "",
  });

  const isStockIn = scannedProduct.type === "IN";

  const stockMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:5001/api/stock-movement/in`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            handled_by: user?.id,
            product_id: scannedProduct.id,
            quantity: Number(formData.quantity),
            reference: formData.reference,
            type: scanMode,
            price: scannedProduct.price,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Delete Product Failed");
      }

      return data;
    },
    onSuccess: (response) => {
      setScannedProduct(null);

      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["products-data"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmitStock = (e: any) => {
    e.preventDefault();

    stockMutation.mutate();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-4">
        <h3 className="text-white font-semibold">Scanned Product</h3>
        <p className="text-blue-100 text-sm mt-1">
          Ready for {scanMode === "IN" ? "stock in" : "stock out"}
        </p>
      </div>
      <form onSubmit={handleSubmitStock} className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-linear-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
            <Package size={32} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900">
              {scannedProduct.productName}
            </h4>
            <p className="text-sm text-gray-500 font-mono">
              {scannedProduct.sku}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {scannedProduct.barcode}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Category</span>
            <span className="font-medium text-gray-900">
              {scannedProduct.category.length > 3
                ? capitalizeFirst(scannedProduct.category)
                : scannedProduct.category.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Location</span>
            <span className="font-medium text-gray-900">
              {scannedProduct.location}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Current Stock</span>
            <span className={`font-bold ${getStockStatus(scannedProduct)}`}>
              {scannedProduct.stock} pcs
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Status</span>
            <span
              className={`inline-flex px-2 py-1 text-xs rounded-full ${getStockStatus(scannedProduct).color}`}
            >
              {getStockStatus(scannedProduct).label}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Price</span>
            <span className="font-medium text-gray-900">
              {pesoFormatter.format(scannedProduct.price)}
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              max={!isStockIn ? scannedProduct?.stock : undefined}
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const input = e.currentTarget;

                let value = Number(input.value);

                if (!isStockIn && scannedProduct?.stock) {
                  if (value > scannedProduct.stock) {
                    input.value = String(scannedProduct.stock);
                  }
                }

                if (value < 1) {
                  input.value = "1";
                }
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none"
            />
          </div>

          {/* Reference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reference / Reason
            </label>
            <textarea
              rows={3}
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder={
                scanMode === "IN"
                  ? "e.g. Supplier delivery, restock"
                  : "e.g. Sold item, damaged, transfer"
              }
              className="w-full resize-none px-3 py-2 border border-gray-200 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <button
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            scanMode === "IN"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Continue to {scanMode === "IN" ? "Stock In" : "Stock Out"}
        </button>
      </form>
    </div>
  );
};

export default ScanScannedProductDetail;
