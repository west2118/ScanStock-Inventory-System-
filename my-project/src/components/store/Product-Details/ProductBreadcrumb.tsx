import { Link } from "react-router-dom";

type ProductBreadcrumbProps = {
  categoryName: string;
  categoryId: number;
  productName: string;
};

const ProductBreadcrumb = ({
  categoryName,
  categoryId,
  productName,
}: ProductBreadcrumbProps) => {
  return (
    <nav className="flex mb-6 text-sm flex-wrap items-center">
      <Link to="/" className="text-gray-500 hover:text-blue-600">
        Home
      </Link>
      <span className="mx-2 text-gray-400">/</span>
      <Link to="/products" className="text-gray-500 hover:text-blue-600">
        Products
      </Link>
      <span className="mx-2 text-gray-400">/</span>
      <Link
        to={`/products?categoryId=${categoryId}`}
        className="text-gray-500 hover:text-blue-600"
      >
        {categoryName || "Category"}
      </Link>
      <span className="mx-2 text-gray-400">/</span>
      <span className="text-gray-900 font-medium">{productName}</span>
    </nav>
  );
};

export default ProductBreadcrumb;
