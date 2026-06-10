import React, { useState } from "react";
import CartItemCard from "./CartItemCard";
import CartItems from "./CartItems";
import CartOrderSummary from "./CartOrderSummary";
import type { CartItem } from "../../../utils/types";

const ShoppingCartList = ({ cartItems }: { cartItems: CartItem[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items - Left Column */}
      <CartItems cartItems={cartItems} />

      {/* Order Summary - Right Column */}
      <CartOrderSummary cartItems={cartItems} />
    </div>
  );
};

export default ShoppingCartList;
