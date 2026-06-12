import type { OrderItemType } from "../../../types/order.types";
import { pesoFormatter } from "../../../utils/utils";

const OrdersItemCard = ({ item }: { item: OrderItemType }) => {
  return (
    <div className="px-6 py-4 flex flex-wrap items-center gap-4">
      <img src={item.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
      <div className="flex-1">
        <p className="font-medium text-gray-900">{item.productName}</p>
        <p className="text-xs text-gray-500">{item.sku}</p>
        <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">
          {pesoFormatter.format(item.price)}
        </p>
      </div>
    </div>
  );
};

export default OrdersItemCard;
