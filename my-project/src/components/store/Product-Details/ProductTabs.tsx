import { useState } from "react";
import { Star, CheckCircle, Flag } from "lucide-react";
import type { ProductDetailsType } from "../../../utils/types";

const ProductTabs = ({ product }: { product: ProductDetailsType }) => {
  const [activeTab, setActiveTab] = useState("description");

  const reviews = product.reviews ?? [];

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc: any, curr: any) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
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
                  __html: product.description,
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {product.features?.split(", ").map((feature, idx) => (
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
                {product.specifications && Object.entries(product.specifications).map(([_, value]: any) => (
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
        {activeTab === "availability" && (
          <div className="overflow-x-auto">
            {product.branchAvailability && product.branchAvailability.length > 0 ? (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-gray-700">Branch Name</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Address</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Contact</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Stock Status</th>
                  </tr>
                </thead>
                <tbody>
                  {product.branchAvailability.map((branch, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{branch.branch}</td>
                      <td className="py-3 px-4 text-gray-600">{branch.address}</td>
                      <td className="py-3 px-4 text-gray-600">{branch.phone}</td>
                      <td className="py-3 px-4">
                        {branch.stock > 0 ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            In Stock ({branch.stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Out of Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No branch availability information found.
              </div>
            )}
          </div>
        )}

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
                    const count = reviews.filter((r: any) => r.rating === star).length;
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
              {reviews.map((review: any) => (
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
  );
};

export default ProductTabs;
