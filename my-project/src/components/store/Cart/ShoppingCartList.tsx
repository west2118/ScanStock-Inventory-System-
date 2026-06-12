import React, { useState } from "react";
import CartItemCard from "./CartItemCard";
import CartItems from "./CartItems";
import CartOrderSummary from "./CartOrderSummary";
import type { CartItem } from "../../../utils/types";
import { ShoppingCart } from "lucide-react";
import EmptyCart from "./EmptyCart";

const ShoppingCartList = ({ cartItems }: { cartItems: CartItem[] }) => {
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <CartItems cartItems={cartItems} />

      {/* Order Summary */}
      <CartOrderSummary cartItems={cartItems} />
    </div>
  );
};
export default ShoppingCartList;
