import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({
  product,
  showBadge,
}: {
  product: any;
  showBadge?: any;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showBadge && product.badge && (
          <span
            className={`absolute top-2 left-2 ${product.badgeColor} text-white text-xs px-2 py-1 rounded-full`}
          >
            {product.badge}
          </span>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">
            ({product.reviews?.toLocaleString()} reviews)
          </span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ₱{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₱{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {product.sold && (
          <p className="text-xs text-gray-500 mb-3">
            {product.sold.toLocaleString()} sold this month
          </p>
        )}
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
