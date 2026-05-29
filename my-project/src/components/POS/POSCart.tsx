import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  DollarSign,
  CreditCard,
  Wallet,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import type { ItemType } from "../../utils/types";
import CartItemCard from "./CartItemCard";
import CartTotals from "./CartTotals";
import { useForm } from "../../hooks/useForm";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

type POSCartProps = {
  items: ItemType[];
  clearItem: () => void;
  addItem: (item: ItemType) => void;
  removeItem: (id: number) => void;
  deleteItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  updateItemPrice: (id: number, price: number | "") => void;
};

const POSCart = ({
  items,
  clearItem,
  addItem,
  removeItem,
  deleteItem,
  updateItemQuantity,
  updateItemPrice,
}: POSCartProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { formData, handleChange, setField } = useForm({
    paymentMethod: "cash",
    notes: "",
    cash: "",
    customerName: "",
    discount: "",
  });

  return (
    <div className="lg:col-span-1">
      {/* Cart Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-t-xl p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} />
            <h3 className="font-semibold">Current Sale</h3>
          </div>
          <span className="text-xs">{items.length} item(s)</span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white border-x border-gray-200 min-h-75 max-h-100 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              addItem={addItem}
              removeItem={removeItem}
              deleteItem={deleteItem}
            />
          ))}
        </div>
        {items.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">Cart is empty</p>
            <p className="text-xs text-gray-400 mt-1">
              Scan or search products to add
            </p>
          </div>
        )}
      </div>

      {/* Cart Totals */}
      <CartTotals
        items={items}
        formData={formData}
        handleChange={handleChange}
        setField={setField}
        clearItem={clearItem}
      />
    </div>
  );
};

export default POSCart;
