import type { ItemType } from "../../utils/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import { pesoFormatter } from "../../utils/utils";

type CartItemCardProps = {
  item: ItemType;
  removeItem: (id: number) => void;
  addItem: (item: ItemType) => void;
  deleteItem: (id: number) => void;
};

const CartItemCard = ({
  item,
  removeItem,
  addItem,
  deleteItem,
}: CartItemCardProps) => {
  return (
    <div key={item.id} className="p-4">
      <div className="flex justify-between mb-2">
        <div>
          <p className="font-medium text-gray-900">{item.productName}</p>
          <p className="text-xs text-gray-500">{item.sku}</p>
        </div>
        <button
          onClick={() => deleteItem(item.id)}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => removeItem(item.id)}
            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
          >
            <Minus size={12} />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => addItem(item)}
            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
          >
            <Plus size={12} />
          </button>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">
            {pesoFormatter.format(item.price * item.quantity)}
          </p>
          <p className="text-xs text-gray-400">
            {pesoFormatter.format(item.price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
