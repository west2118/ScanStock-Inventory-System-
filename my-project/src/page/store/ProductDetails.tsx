import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/utils";
import { useParams } from "react-router-dom";
import ProductDisplay from "../../components/store/Product-Details/ProductDisplay";
import ProductBreadcrumb from "../../components/store/Product-Details/ProductBreadcrumb";
import ProductTabs from "../../components/store/Product-Details/ProductTabs";
import RelatedProducts from "../../components/store/Products/RelatedProducts";
import ProductDetailsSkeleton from "../../components/skeleton/products/ProductDetailsSkeleton";
import ProductNotFound from "../../components/store/Product-Details/ProductNotFound";
import type { ProductDetailsType } from "../../utils/types";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery<ProductDetailsType>({
    queryKey: ["collection-data", id],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/collections/${id}`),
    enabled: !!id,
  });

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError || !data) {
    return <ProductNotFound />;
  }


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductBreadcrumb
          categoryName={data.categoryName}
          categoryId={data.categoryId}
          productName={data.productName}
        />

        <ProductDisplay product={data} />

        <ProductTabs product={data} />

        <RelatedProducts
          currentProductId={id}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
