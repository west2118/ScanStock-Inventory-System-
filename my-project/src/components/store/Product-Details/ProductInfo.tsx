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
import { pesoFormatter } from "../../../utils/utils";

const ProductInfo = ({ product }: { product: ProductDetailsType }) => {
  const [quantity, setQuantity] = useState(1);

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
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1">
          {renderStars(product.rating)}
        </div>
        <span className="text-sm font-medium text-gray-900">
          {product.rating}
        </span>
        <span className="text-sm text-gray-500">(5 reviews)</span>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">
            {pesoFormatter.format(Number(product.price))}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ₱{product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded-full">
            Save ₱{(product.originalPrice - product.price).toLocaleString()}
          </span>
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
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Buy It Now
        </button>

        <button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5" />
        </button>

        <button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
          <Heart className="w-5 h-5" />
        </button>

        <button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-xl mb-6">
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
