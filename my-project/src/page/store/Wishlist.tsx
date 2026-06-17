// WishlistPage.jsx
import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  Package,
  Truck,
  Shield,
  RotateCcw,
  Clock,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Share2,
  MoveRight,
  ChevronDown,
  User,
  Search,
  Cpu,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData, fetchWithAuth } from "../../utils/utils";
import { toast } from "react-toastify";
import WishlistEmptyState from "../../components/store/Wishlist/WishlistEmptyState";
import WishlistItemCard from "../../components/store/Wishlist/WishlistItemCard";
import WishlistRemoveModal from "../../components/store/Wishlist/WishlistRemoveModal";
import WishlistRecommended from "../../components/store/Wishlist/WishlistRecommended";

const WishlistPage = () => {
  const queryClient = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchData("http://localhost:5001/api/wishlist"),
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<any | null>(null);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.filter((item: any) => item.inStock).map((item: any) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      setSelectAll(false);
    } else {
      setSelectedItems([...selectedItems, itemId]);
      const inStockItems = wishlistItems.filter((item: any) => item.inStock);
      if (selectedItems.length + 1 === inStockItems.length) {
        setSelectAll(true);
      }
    }
  };

  const handleRemoveItem = (item: any) => {
    setItemToRemove(item);
    setShowRemoveModal(true);
  };

  const removeItemMutation = useMutation({
    mutationFn: async (productId: number) => {
      const res = await fetchWithAuth(`http://localhost:5001/api/wishlist/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-count"] });
      setShowRemoveModal(false);
      setItemToRemove(null);
    }
  });

  const removeBulkMutation = useMutation({
    mutationFn: async (productIds: number[]) => {
      const res = await fetchWithAuth(`http://localhost:5001/api/wishlist/remove-bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds }),
      });
      if (!res.ok) throw new Error("Failed to remove bulk");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-count"] });
      setSelectedItems([]);
      setSelectAll(false);
    }
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      const res = await fetchWithAuth(`http://localhost:5001/api/carts/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-data"] });
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-count"] });
      toast.success("Successfully added to cart");
    }
  });

  const confirmRemove = () => {
    if (itemToRemove) {
      removeItemMutation.mutate(itemToRemove.id);
    }
  };

  const handleRemoveSelected = () => {
    removeBulkMutation.mutate(selectedItems);
  };

  const handleMoveToCart = (item: any) => {
    addToCartMutation.mutate(item.id);
  };

  const handleMoveSelectedToCart = () => {
    selectedItems.forEach(id => addToCartMutation.mutate(id));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Wishlist
              </h1>
              <p className="text-gray-500 mt-1">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "item" : "items"} saved for later
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Wishlist
              </button>
            </div>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <WishlistEmptyState />
        ) : (
          <>
            {/* Bulk Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-gray-900"
                  />
                  Select All
                </label>
                {selectedItems.length > 0 && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleMoveSelectedToCart}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Move to Cart ({selectedItems.length})
                    </button>
                    <button
                      onClick={handleRemoveSelected}
                      className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                    >
                      Remove ({selectedItems.length})
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {wishlistItems.map((item: any) => (
                <WishlistItemCard
                  key={item.id}
                  item={item}
                  selectedItems={selectedItems}
                  handleSelectItem={handleSelectItem}
                  handleRemoveItem={handleRemoveItem}
                  handleMoveToCart={handleMoveToCart}
                />
              ))}
            </div>

            <WishlistRecommended wishlistItems={wishlistItems} />
          </>
        )}
      </div>

      <WishlistRemoveModal
        show={showRemoveModal}
        itemToRemove={itemToRemove}
        onCancel={() => setShowRemoveModal(false)}
        onConfirm={confirmRemove}
      />
    </div>
  );
};

export default WishlistPage;
