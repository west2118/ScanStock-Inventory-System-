import React from "react";
import CartItemCard from "./CartItemCard";
import type { CartItem } from "../../../utils/types";

const CartItems = ({ cartItems }: { cartItems: CartItem[] }) => {

  return (
    <div className="lg:col-span-2">
      {/* Cart Items List */}
      <div className="space-y-4">
        {cartItems?.map((item) => (
          <CartItemCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartItems;
