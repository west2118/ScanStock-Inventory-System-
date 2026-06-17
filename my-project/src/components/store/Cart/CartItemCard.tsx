import { Minus, Plus, X } from "lucide-react";
import type { CartItem } from "../../../utils/types";
import { pesoFormatter } from "../../../utils/utils";
import { useAddCart } from "../Hooks/useAddCart";
import { useMinusCart } from "../Hooks/useMinusCart";
import { useRemoveCart } from "../Hooks/useRemoveItemCart";
import { useSelectCart } from "../Hooks/useSelectCart";

const CartItemCard = ({ item }: { item: CartItem }) => {
  const addCartMutation = useAddCart();
  const minusCartMutation = useMinusCart();
  const removeCartMutation = useRemoveCart();
  const selectCartMutation = useSelectCart();

  const subtotal = Number(item.price) * item.quantity;

  return (
    <div
      key={item.id}
      className="relative bg-white rounded-xl shadow-sm border border-gray-50 p-5 hover:shadow-md transition-shadow"
    >
      {/* Delete Button */}
      <button
        onClick={() => removeCartMutation.mutate(item.productId)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <input
            type="checkbox"
            checked={item.isSelected}
            onChange={() => selectCartMutation.mutate(item.productId)}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />

          <div className="w-24 h-24 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_130px_140px] gap-6 w-full h-24">
          {/* Product Info */}
          <div className="min-w-0 flex flex-col justify-between py-1">
            <div>
              <p className="text-xs text-gray-400">{item.brandName}</p>

              <h3 className="font-medium text-gray-900 truncate">
                {item.productName}
              </h3>

              <p className="font-semibold text-gray-900">
                {pesoFormatter.format(Number(item.price))}
              </p>
            </div>

            <div>

              <p className="text-xs text-gray-500 mt-0.5">
                {item.stock} units available
              </p>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex justify-center self-end py-1">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => minusCartMutation.mutate(item.productId)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="w-10 text-center text-sm">{item.quantity}</span>

              <button
                onClick={() => addCartMutation.mutate({ productId: item.productId })}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="text-right w-35 self-end py-1">
            <p className="text-lg font-semibold text-gray-900">
              {pesoFormatter.format(subtotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
