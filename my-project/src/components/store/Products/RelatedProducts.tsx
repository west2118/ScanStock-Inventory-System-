import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../utils/utils";
import ProductsProductCard from "./ProductsProductCard";
import ProductCardSkeleton from "../../skeleton/ProductCardSkeleton";
import type { ProductType } from "../../../utils/types";

type RelatedProductsProps = {
  currentProductId: string | undefined;
};

const RelatedProducts = ({
  currentProductId,
}: RelatedProductsProps) => {
  const { data: relatedData, isLoading } = useQuery({
    queryKey: ["related-products", currentProductId],
    queryFn: fetchData(
      `${import.meta.env.VITE_API_URL}/collections/${currentProductId}/related`
    ),
    enabled: !!currentProductId,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  const relatedProducts: ProductType[] = relatedData?.products ?? [];

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <ProductsProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
