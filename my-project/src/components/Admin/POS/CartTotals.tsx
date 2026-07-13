import { DollarSign, CreditCard, Wallet, CheckCircle } from "lucide-react";
import type { ItemType } from "../../../utils/types";
import { pesoFormatter } from "../../../utils/utils";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";

const CartTotals = ({
  items,
  formData,
  handleChange,
  setField,
  clearItem,
}: {
  items: ItemType[];
  formData: any;
  handleChange: any;
  setField: any;
  clearItem: () => void;
}) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.12;
  const discountAmount = Number(formData.discount) || 0;
  const total = subtotal - discountAmount;
  const change = formData.cash
    ? (parseFloat(formData.cash) - total).toFixed(2)
    : 0;

  const clearAll = () => {
    clearItem();
    setField("discount", "");
    setField("cash", "");
    setField("customerName", "");
    setField("notes", "");
    setField("paymentMethod", "cash");
  };

  const transactionMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:5001/api/transactions`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          handled_by: user?.id,
          branch_id: user?.branchId,
          customer_name: formData.customerName,
          discount: Number(formData.discount) || 0,
          customer_cash: Number(formData.cash) || 0,
          items,
          notes: formData.notes,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Trasanction Failed");
      }

      return data;
    },
    onSuccess: async (response) => {
      clearAll();
      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["products-listed"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmitTransaction = async () => {
    if (!items || items.length === 0) {
      toast.error("Please add at least one item.");
      return;
    }

    if (!formData.customerName.trim()) {
      toast.error("Customer name is required.");
      return;
    }

    if (Number(formData.discount) < 0) {
      toast.error("Discount cannot be negative.");
      return;
    }

    if (Number(formData.discount) > subtotal) {
      toast.error("Discount cannot exceed subtotal.");
      return;
    }

    if (!formData.cash || Number(formData.cash) <= 0) {
      toast.error("Enter customer cash amount.");
      return;
    }

    if (Number(formData.cash) < total) {
      toast.error("Insufficient cash.");
      return;
    }

    transactionMutation.mutate();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-b-xl p-4">
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{pesoFormatter.format(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (12%)</span>
          <span className="font-medium">{pesoFormatter.format(tax)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-blue-600">
              {pesoFormatter.format(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Customer Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        {/* Customer */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Customer
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter customer name"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Notes
          </label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter notes"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Payment Method
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setField("paymentMethod", "cash")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all ${
              formData.paymentMethod === "cash"
                ? "bg-green-50 border-green-500 text-green-700"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Wallet size={16} />
            <span className="text-sm">Cash</span>
          </button>
          <button
            onClick={() => setField("paymentMethod", "card")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all ${
              formData.paymentMethod === "card"
                ? "bg-blue-50 border-blue-500 text-blue-700"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <CreditCard size={16} />
            <span className="text-sm">Card</span>
          </button>
        </div>
      </div>

      {/* Amount Paid (for cash) */}
      {formData.paymentMethod === "cash" && (
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Amount Received
          </label>
          <div className="relative">
            <DollarSign
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="number"
              name="cash"
              value={formData.cash}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          {formData.cash && parseFloat(formData.cash) >= total && (
            <p className="text-xs text-green-600 mt-1">
              Change: {pesoFormatter.format(Number(change))}
            </p>
          )}
          {formData.cash &&
            parseFloat(formData.cash) < total &&
            parseFloat(formData.cash) > 0 && (
              <p className="text-xs text-red-600 mt-1">Amount insufficient</p>
            )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm">
          Clear
        </button>
        <button
          onClick={handleSubmitTransaction}
          disabled={
            items.length === 0 ||
            (formData.paymentMethod === "cash" &&
              (!formData.cash || parseFloat(formData.cash) < total))
          }
          className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors flex items-center justify-center gap-2 ${
            items.length === 0 ||
            (formData.paymentMethod === "cash" &&
              (!formData.cash || parseFloat(formData.cash) < total))
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <CheckCircle size={16} />
          <span>Pay Now</span>
        </button>
      </div>
    </div>
  );
};

export default CartTotals;
