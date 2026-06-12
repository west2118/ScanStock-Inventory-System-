import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-500 mb-6">
            Thank you for your order. You will receive a confirmation email
            shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600">
              Order #:{" "}
              <span className="font-medium text-gray-900">ORD-2024-001234</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Estimated Delivery:{" "}
              <span className="font-medium text-gray-900">
                March 25-27, 2024
              </span>
            </p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
