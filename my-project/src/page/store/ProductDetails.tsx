// ProductDetailsPage.jsx
import { useState } from "react";
import { Star, CheckCircle, ThumbsUp, Flag } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/utils";
import { useParams } from "react-router-dom";
import ProductDisplay from "../../components/store/Product-Details/ProductDisplay";
import type { ProductDetailsType } from "../../utils/types";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");

  const { data } = useQuery<ProductDetailsType>({
    queryKey: ["collection-data", id],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/collections/${id}`),
    enabled: !!id,
  });

  const reviews = data?.reviews ?? [];

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  // Related Products
  const relatedProducts = [
    {
      id: 2,
      name: "ASUS ROG Strix RTX 4080 OC",
      price: 89995,
      originalPrice: 99995,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=200&h=150&fit=crop",
    },
    {
      id: 3,
      name: "MSI RTX 4090 Suprim X",
      price: 129995,
      originalPrice: 139995,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=200&h=150&fit=crop",
    },
    {
      id: 4,
      name: "Gigabyte RTX 4090 Gaming OC",
      price: 119995,
      originalPrice: 129995,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=200&h=150&fit=crop",
    },
    {
      id: 5,
      name: "Intel Core i9-13900K Processor",
      price: 32995,
      originalPrice: 35995,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&h=150&fit=crop",
    },
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  if (!data) return;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <a href="/" className="text-gray-500 hover:text-blue-600">
            Home
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="/products" className="text-gray-500 hover:text-blue-600">
            Products
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <a
            href="/products?category=components"
            className="text-gray-500 hover:text-blue-600"
          >
            Components
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium">
            ASUS ROG Strix RTX 4090
          </span>
        </nav>

        <ProductDisplay product={data} />

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-12">
          <div className="border-b border-gray-200">
            <div className="flex gap-6 px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "description"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "specifications"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("availability")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "availability"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                Branch Availability
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "reviews"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Description Tab */}
            {activeTab === "description" && (
              <div>
                <div className="prose max-w-none">
                  <div
                    className="
                        text-gray-700 leading-7
                        [&>h2]:text-xl
                        [&>h2]:font-bold
                        [&>p]:text-gray-500
                        [&>h2]:mb-3
                        [&>p]:mb-4
                      "
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {data.features.split(", ").map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {Object.entries(data.specifications).map(([_, value]) => (
                      <tr key={value.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50 w-1/3">
                          {value.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {value.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Branch Availability Tab */}
            {/* {activeTab === "availability" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.branchAvailability.map((branch) => (
                    <div
                      key={branch.branch}
                      className="border border-gray-200 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-gray-900">
                            {branch.branch}
                          </h4>
                        </div>
                        {branch.stock > 0 ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {branch.stock} in stock
                          </span>
                        ) : (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            Out of stock
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {branch.address}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Phone className="w-4 h-4" />
                        <span>{branch.phone}</span>
                      </div>
                      {branch.stock > 0 && (
                        <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                          Pick up from this branch
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="mb-10 flex flex-col items-center">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-8">Customer Reviews</h3>
                  <div className="flex items-center justify-center gap-8 w-full max-w-4xl">
                    {/* Left Column: Summary */}
                    <div className="flex flex-col w-48">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex gap-0.5">
                          {renderStars(Math.round(Number(averageRating)))}
                        </div>
                        <p className="text-sm font-medium">
                          {averageRating} out of 5
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on {reviews.length} reviews
                      </p>
                    </div>

                    <div className="h-28 w-px bg-gray-200 hidden sm:block"></div>

                    {/* Middle Column: Breakdown */}
                    <div className="flex flex-col gap-1.5 w-72">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = reviews.filter((r) => r.rating === star).length;
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-3">
                            <div className="flex gap-0.5">
                              {renderStars(star)}
                            </div>
                            <div className="flex-1 h-3.5 bg-gray-100 overflow-hidden">
                              <div
                                className="bg-yellow-400 h-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 w-4 text-right">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="h-28 w-px bg-gray-200 hidden sm:block"></div>

                    {/* Right Column: Button */}
                    <div className="w-48 flex justify-center">
                      <button className="px-6 py-2.5 border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors w-full">
                        Ask a question
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                            {review.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">
                                {review.user}
                              </span>
                              {review.verified && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-0.5">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-xs text-gray-400">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-blue-600">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {review.title}
                      </h4>
                      <p className="text-gray-600">{review.content}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">
                      {product.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ₱{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₱{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
