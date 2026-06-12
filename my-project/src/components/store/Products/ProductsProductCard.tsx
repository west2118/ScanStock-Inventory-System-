import { Heart, ShoppingCart, ShoppingCartIcon, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ProductType } from "../../../utils/types";

const ProductsProductCard = ({ product }: { product: ProductType }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${product.slug}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full"
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.productName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>

        {product.stock < 10 && (
          <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Only {product.stock} left
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 mb-1">{product.brandName}</p>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
          {product.productName}
        </h3>

        {/* <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>

          <span className="text-xs text-gray-400">
            ({product.reviews.toLocaleString()})
          </span>
        </div> */}

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ₱{product.price.toLocaleString()}
          </span>

          {product.price && (
            <span className="text-xs text-gray-400 line-through">
              ₱{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add To Cart Button */}
        <div className="mt-auto pt-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Buy Now
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCartIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsProductCard;
