import { ChevronLeft, ChevronRight, Truck } from "lucide-react";
import { deliveryMethods } from "../../../utils/constants";

const DeliveryMethod = ({
  deliveryMethod,
  setDeliveryMethod,
  currentStep,
  setCurrentStep,
  handlePrevStep,
  handleNextStep,
}: any) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 ${currentStep !== 2 && "opacity-60"}`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
            <Truck className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Delivery Method
          </h2>
        </div>
        {currentStep > 2 && (
          <button
            onClick={() => setCurrentStep(2)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Edit
          </button>
        )}
      </div>

      {currentStep === 2 ? (
        <div>
          <div className="space-y-3">
            {deliveryMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                  deliveryMethod === method.id
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={method.id}
                    checked={deliveryMethod === method.id}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-4 h-4 text-gray-900"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.days}</p>
                  </div>
                </div>
                <div className="text-right">
                  {method.price === 0 ? (
                    <span className="text-sm text-green-600">Free</span>
                  ) : (
                    <span className="text-sm font-medium text-gray-900">
                      ₱{method.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handlePrevStep}
              className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleNextStep}
              className="flex-1 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              Continue to Payment
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          <p>{deliveryMethods.find((m) => m.id === deliveryMethod)?.name}</p>
          <p className="text-gray-400 text-xs mt-1">
            {deliveryMethods.find((m) => m.id === deliveryMethod)?.days}
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryMethod;
