import React from "react";

const OrdersItemCard = ({ item }: any) => {
  return (
    <div className="flex items-center gap-2">
      <img src={item.imageUrl} className="w-8 h-8 rounded object-cover" />
      <div>
        <p className="text-sm text-gray-900">{item.productName}</p>
        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
      </div>
    </div>
  );
};

export default OrdersItemCard;
