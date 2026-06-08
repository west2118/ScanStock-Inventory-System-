import { ShoppingCart, Star } from "lucide-react";

const ProductsRowProductCard = ({ product }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-32">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <p className="text-xs text-gray-500">
                {product.brand.toUpperCase()}
              </p>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-400">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ₱{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ₱{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <button className="mt-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm">
                <ShoppingCart className="w-3 h-3" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsRowProductCard;
