import React from "react";
import CartItemCard from "./CartItemCard";
import type { CartItem } from "../../../utils/types";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartItems = ({ cartItems }: { cartItems: CartItem[] }) => {
  const navigate = useNavigate();

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
