import type { ItemType } from "../../../utils/types";
import ScanItemCard from "./ScanItemCard";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ScanScannedProductDetailProps = {
  scanMode: any;
  items: ItemType[];
  removeItem: (id: number) => void;
  updateItem: (
    id: number,
    field: "quantity" | "remarks",
    value: number | string,
  ) => void;
  clearItem: () => void;
};

const ScanScannedProductDetail = ({
  scanMode,
  items,
  removeItem,
  updateItem,
  clearItem,
}: ScanScannedProductDetailProps) => {
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");

  const stockMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:5001/api/stock-adjustments`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
            adjustmentType: scanMode,
            reason: reason,
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
      clearItem();
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

    if (!reason.trim()) return toast.error("Reason is required");

    stockMutation.mutate();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">Bulk Stock Adjustment</h3>
            <p className="text-blue-100 text-sm mt-1">
              Ready for {scanMode === "IN" ? "stock in" : "stock out"} -{" "}
              {items.length} product{items.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitStock} className="p-6">
        {/* Scrollable Items List */}
        <div className="max-h-100 overflow-y-auto mb-4 space-y-3 pr-2">
          {items.map((item) => (
            <ScanItemCard
              key={item.id}
              item={item}
              scanMode={scanMode}
              updateItem={updateItem}
              removeItem={removeItem}
            />
          ))}
        </div>

        {/* Summary Section */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Products:</span>
            <span className="font-semibold text-gray-900">{items.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Total Quantity:</span>
            <span
              className={`font-semibold ${scanMode === "IN" ? "text-green-600" : "text-red-600"}`}
            >
              {scanMode === "IN" ? "+" : "-"}
              {items.reduce((sum, item) => sum + (item.quantity || 0), 0)} units
            </span>
          </div>
        </div>

        {/* Reference / Overall Reason */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Overall Reference / Reason
          </label>
          <textarea
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={
              scanMode === "IN"
                ? "e.g., Bulk restock from supplier PO #12345"
                : "e.g., Inventory write-off, store transfer"
            }
            className="w-full resize-none px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              scanMode === "IN"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-red-600 text-white hover:bg-red-700"
            } ${items.length === 0 || items.some((item) => !item.productId || !item.quantity) ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={
              items.length === 0 ||
              items.some((item) => !item.productId || !item.quantity)
            }
          >
            Process {scanMode === "IN" ? "Stock In" : "Stock Out"} (
            {items.length} items)
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScanScannedProductDetail;
