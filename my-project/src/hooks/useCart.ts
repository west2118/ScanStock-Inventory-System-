import { useState } from "react";
import type { ItemType } from "../utils/types";

export const useCart = () => {
  const [items, setItems] = useState<ItemType[]>([]);

  const addItem = (product: any) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => Number(item.id) === Number(product.id),
      );

      const currentQty = existingItem?.quantity || 0;

      // Prevent exceeding stock
      if (currentQty >= product.stock) {
        return prevItems;
      }

      if (existingItem) {
        return prevItems.map((item) =>
          Number(item.id) === Number(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem?.quantity === 1) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  };

  const deleteItem = (id: number) => {
    setItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const updateItemPrice = (id: number, price: number | "") => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price } : item)),
    );
  };

  const clearItem = () => setItems([]);

  return {
    items,
    setItems,
    addItem,
    removeItem,
    deleteItem,
    clearItem,
    updateItemQuantity,
    updateItemPrice,
  };
};
