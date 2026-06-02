import type { ItemType, ProductType } from "../../utils/types";
import { Package } from "lucide-react";
import { pesoFormatter } from "../../utils/utils";

type ProductListedCardProps = {
  product: ProductType;
  addItem: (item: ProductType) => void;
  items: ItemType[];
};

const ProductListedCard = ({
  product,
  addItem,
  items,
}: ProductListedCardProps) => {
  const currentQty = items
    .filter((i) => Number(i.id) === Number(product.id))
    .reduce((sum, i) => sum + i.quantity, 0);

  const availableStock = Math.max(product.stock - currentQty, 0);
  const isOutOfStock = availableStock <= 0;

  return (
    <button
      key={product.id}
      onClick={() => addItem(product)}
      disabled={isOutOfStock}
      className={`text-left p-4 rounded-xl border transition-all ${
        isOutOfStock
          ? "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed"
          : "hover:shadow-md hover:border-blue-300 cursor-pointer bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <Package size={20} className="text-blue-500" />
      </div>
      <p className="font-semibold text-gray-900 text-sm">
        {product.productName}
      </p>
      <p className="text-xs text-gray-500 font-mono mt-1">
        {product.category} - {product.sku}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">
          {pesoFormatter.format(product.price)}
        </span>
        <span className="text-xs text-gray-400">Stock: {availableStock}</span>
      </div>
    </button>
  );
};

export default ProductListedCard;
