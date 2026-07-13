import {
  CheckCircle,
  Clock,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import type { ProductDetailsType } from "../../../utils/types";
import { pesoFormatter, fetchData, fetchWithAuth } from "../../../utils/utils";
import { useAddCart } from "../Hooks/useAddCart";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ product }: { product: ProductDetailsType }) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addCartMutation = useAddCart();

  const reviews = product.reviews ?? [];
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc: number, curr: any) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const { data: wishlistItems = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchData("http://localhost:5001/api/wishlist"),
    enabled: !!user,
  });

  const isFavorited = wishlistItems.some((item: any) => item.id === product.id);

  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      if (!user) return; // Could optionally show login modal here
      if (isFavorited) {
        const res = await fetchWithAuth(`http://localhost:5001/api/wishlist/${product.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to remove");
      } else {
        const res = await fetchWithAuth(`http://localhost:5001/api/wishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.id }),
        });
        if (!res.ok) throw new Error("Failed to add");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-count"] });
      if (isFavorited) {
        toast.success("Removed from wishlist!");
      } else {
        toast.success("Added to wishlist successfully!");
      }
    },
    onError: () => {
      toast.error("Failed to update wishlist");
    }
  });

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div>
      {/* Brand & SKU */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-blue-600 font-medium text-sm">
          {product.brandName}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        {product.productName}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          {renderStars(Math.round(Number(averageRating)))}
        </div>
        <span className="text-sm font-medium text-gray-900">
          {averageRating}
        </span>
        <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">
            {pesoFormatter.format(Number(product.price))}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-lg text-gray-400 line-through">
                ₱{Number(product.originalPrice).toLocaleString()}
              </span>
              <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded-full">
                Save ₱{(Number(product.originalPrice) - Number(product.price)).toLocaleString()}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              onClick={decrementQuantity}
              className="px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {product.stock} units available
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        {product.stock <= 0 ? (
          <button
            disabled
            className="flex-1 bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
          >
            Out of Stock
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                if (!user) return navigate("/login");
                addCartMutation.mutate(
                  { productId: product.id, quantity, isBuyNow: true },
                  { onSuccess: () => navigate("/cart") }
                );
              }}
              disabled={addCartMutation.isPending}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Buy It Now
            </button>

            <button
              onClick={() => {
                if (!user) return navigate("/login");
                addCartMutation.mutate(
                  { productId: product.id, quantity },
                  {
                    onSuccess: () => {
                      setQuantity(1);
                      toast.success("Added to cart successfully!");
                    }
                  }
                )
              }}
              disabled={addCartMutation.isPending}
              className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </>
        )}

        <button
          onClick={() => {
            if (user) {
              toggleFavoriteMutation.mutate();
            } else {
              navigate("/login");
            }
          }}
          disabled={toggleFavoriteMutation.isPending}
          className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center group"
        >
          <Heart className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-black group-hover:text-red-500"}`} />
        </button>

        <button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-green-600" />
          <span className="text-sm">Free Shipping ₱5,000+</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-sm">2 Year Warranty</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-orange-600" />
          <span className="text-sm">7-Day Returns</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-600" />
          <span className="text-sm">24/7 Support</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
