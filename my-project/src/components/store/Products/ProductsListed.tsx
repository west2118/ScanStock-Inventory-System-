import { Package } from "lucide-react";
import ProductsRowProductCard from "./ProductsRowProductCard";
import ProductsProductCard from "./ProductsProductCard";
import type { ProductType } from "../../../utils/types";

type ProductsListedProps = {
  sortedProducts: ProductType[];
  viewMode: string;
};

const ProductsListed = ({ sortedProducts, viewMode }: ProductsListedProps) => {
  console.log("sortedProducts: ", sortedProducts);

  return (
    <div className="flex-1">
      {/* Products Grid - 4 columns */}
      {sortedProducts && sortedProducts?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms
          </p>
          <button className="mt-4 text-blue-600 hover:text-blue-700">
            Clear all filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductsProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <ProductsRowProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsListed;
