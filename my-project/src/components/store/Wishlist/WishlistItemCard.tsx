import React from 'react';
import { Trash2, Star } from 'lucide-react';

const WishlistItemCard = ({ 
  item, 
  selectedItems, 
  handleSelectItem, 
  handleRemoveItem, 
  handleMoveToCart 
}: {
  item: any;
  selectedItems: number[];
  handleSelectItem: (id: number) => void;
  handleRemoveItem: (item: any) => void;
  handleMoveToCart: (item: any) => void;
}) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
      />
    ));
  };

  return (
    <div
      className="group relative bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all"
    >
      {item.inStock && (
        <label className="absolute top-3 left-3 z-20">
          <input
            type="checkbox"
            checked={selectedItems.includes(item.id)}
            onChange={() => handleSelectItem(item.id)}
            className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
          />
        </label>
      )}
      {/* Remove Button */}
      <button
        onClick={() => handleRemoveItem(item)}
        className="absolute top-3 right-3 z-10 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
      >
        <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
      </button>

      {/* Product Image */}
      <div className="relative pt-4 px-4">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {!item.inStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
            <span className="text-xs font-medium text-red-600">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 pt-3">
        <p className="text-xs text-gray-400 uppercase tracking-wider">
          {item.brand}
        </p>
        <h3 className="font-medium text-gray-900 text-sm mt-1 line-clamp-2 leading-snug">
          {item.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center gap-0.5">
            {renderStars(item.rating)}
          </div>
          <span className="text-xs text-gray-400 ml-1">
            ({item.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2">
          <span className="text-lg font-semibold text-gray-900">
            ₱{Number(item.price).toLocaleString()}
          </span>
          {item.originalPrice && (
            <span className="text-xs text-gray-400 line-through ml-2">
              ₱{item.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleMoveToCart(item)}
          disabled={!item.inStock}
          className={`w-full mt-3 py-2 rounded-lg text-sm font-medium transition-colors ${item.inStock
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
        >
          {item.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default WishlistItemCard;
