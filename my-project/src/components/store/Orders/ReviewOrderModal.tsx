import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Modal from "../../Admin/UI/Modal";

type ReviewData = {
  productId: number;
  rating: number;
  title: string;
  review: string;
};

type ReviewOrderModalProps = {
  selectedOrder: any;
  onClose: () => void;
  onSubmit: (reviewsData: ReviewData[]) => void;
  isSubmitting?: boolean;
};

const ReviewOrderModal: React.FC<ReviewOrderModalProps> = ({
  selectedOrder,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [reviews, setReviews] = useState<Record<number, ReviewData>>({});

  useEffect(() => {
    if (selectedOrder && selectedOrder.items) {
      const initialReviews: Record<number, ReviewData> = {};
      selectedOrder.items.forEach((item: any) => {
        initialReviews[item.productId] = {
          productId: item.productId,
          rating: 5,
          title: "",
          review: "",
        };
      });
      setReviews(initialReviews);
    }
  }, [selectedOrder]);

  const handleReviewChange = (productId: number, field: keyof ReviewData, value: any) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    onSubmit(Object.values(reviews));
  };

  if (!selectedOrder) return null;

  return (
    <Modal
      isModalOpen={true}
      isCloseModal={onClose}
      title={
        <div>
          Write a Review
          <p className="text-sm font-normal text-gray-500 mt-1">
            Share your experience for the products in your order
          </p>
        </div>
      }
      width="max-w-xl"
    >
      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {selectedOrder.items.map((item: any) => {
          const productReview = reviews[item.productId] || { rating: 5, title: "", review: "" };
          return (
            <div key={item.productId} className="border border-gray-100 rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.productName} className="w-12 h-12 object-cover rounded-md" />
                )}
                <div>
                  <h4 className="font-medium text-gray-800">{item.productName}</h4>
                  <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleReviewChange(item.productId, "rating", star)}
                      className="p-1"
                      disabled={isSubmitting}
                    >
                      <Star
                        size={24}
                        className={`transition-colors ${star <= productReview.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 hover:text-yellow-400"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="e.g., Great product!"
                  value={productReview.title}
                  onChange={(e) => handleReviewChange(item.productId, "title", e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Share your experience with this product..."
                  value={productReview.review}
                  onChange={(e) => handleReviewChange(item.productId, "review", e.target.value)}
                  disabled={isSubmitting}
                ></textarea>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 flex justify-center items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Reviews"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default ReviewOrderModal;
