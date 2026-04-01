import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductType } from "../../utils/types";
import { capitalizeFirst } from "../../utils/utils";
import Modal from "../UI/Modal";
import { useForm } from "../../hooks/useForm";
import { toast } from "react-toastify";

type InentoryStockModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedProduct: ProductType | null;
  movementType: string | null;
};

type FormData = {
  quantity: number;
  notes: string;
};

const InentoryStockModal = ({
  isModalOpen,
  isCloseModal,
  selectedProduct,
  movementType,
}: InentoryStockModalProps) => {
  const queryClient = useQueryClient();
  const { formData, handleChange } = useForm<FormData>({
    quantity: 0,
    notes: "",
  });

  const isStockIn = movementType === "IN";

  const productMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `http://localhost:5001/api/product/${selectedProduct?.id}/stock?action=${movementType}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            price: selectedProduct?.price,
          }),
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

      queryClient.invalidateQueries({ queryKey: ["products-data"] });
      queryClient.invalidateQueries({
        queryKey: ["product-list-summary-cards"],
      });
    },

    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    productMutation.mutate(formData);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={`Product Stock ${isStockIn ? "In" : "Out"}`}
    >
      <form onSubmit={handleSubmitForm} className="space-y-4">
        {/* 🔥 Product Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Detail
          </label>
          <div className="border border-gray-200 rounded-lg p-4 shadow-xs">
            <p className="text-sm text-gray-600">
              Product:
              <span className="font-medium">
                {" "}
                {selectedProduct?.productName}
              </span>
            </p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
              <span>
                SKU: <span className="font-medium">{selectedProduct?.sku}</span>
              </span>
              <span>
                Barcode:{" "}
                <span className="font-medium">{selectedProduct?.barcode}</span>
              </span>
              <span>
                Category:{" "}
                <span className="font-medium">
                  {selectedProduct?.category &&
                  selectedProduct?.category.length > 3
                    ? capitalizeFirst(selectedProduct?.category)
                    : selectedProduct?.category.toUpperCase()}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity to Add
          </label>
          <input
            type="number"
            min={1}
            max={!isStockIn ? selectedProduct?.stock : undefined}
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const input = e.currentTarget;

              let value = Number(input.value);

              if (!isStockIn && selectedProduct?.stock) {
                if (value > selectedProduct.stock) {
                  input.value = String(selectedProduct.stock);
                }
              }

              if (value < 1) {
                input.value = "1";
              }
            }}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1"
            placeholder="Enter quantity"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reference / Notes
          </label>
          <textarea
            rows={3}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full resize-none px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1"
            placeholder="Purchase order #, supplier info, etc."
          />
        </div>

        {/* Stock Preview */}
        <div
          className={`rounded-lg p-3 ${
            isStockIn ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          <p className="text-sm">
            Current Stock:{" "}
            <span className="font-bold">{selectedProduct?.stock}</span> → After:{" "}
            <span className="font-bold">
              {isStockIn
                ? (selectedProduct?.stock ?? 0) + Number(formData.quantity)
                : (selectedProduct?.stock ?? 0) - Number(formData.quantity)}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={isCloseModal}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            className={`flex-1 px-4 py-2 text-white rounded-lg ${
              isStockIn
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } transition-colors`}
          >
            Confirm Stock {isStockIn ? "In" : "Out"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default InentoryStockModal;
