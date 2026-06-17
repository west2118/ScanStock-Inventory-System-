// CartPage.jsx - Professional Shopping Cart
import React, { useState } from "react";
import ShoppingCartList from "../../components/store/Cart/ShoppingCartList";
import { fetchData } from "../../utils/utils";
import { useQuery } from "@tanstack/react-query";
import type { CartItem } from "../../utils/types";

const CartPage = () => {
  const { data: cartItems = [] } = useQuery<CartItem[]>({
    queryKey: ["cart-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/carts`),
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center text-center gap-3 mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Shopping Cart
          </h1>
        </div>

        <ShoppingCartList cartItems={cartItems} />
      </div>
    </div>
  );
};

export default CartPage;
