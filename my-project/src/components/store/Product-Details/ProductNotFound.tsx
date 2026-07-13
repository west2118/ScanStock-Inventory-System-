import { Link } from "react-router-dom";

const ProductNotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">📦</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Product Not Found</h2>
        <p className="text-gray-500 mb-8">
          We couldn't find the product you're looking for. It may have been removed or the link might be broken.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ProductNotFound;
