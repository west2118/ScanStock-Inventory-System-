import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import { paymentMethods } from "../../../utils/constants";

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  currentStep,
  setCurrentStep,
  handlePrevStep,
  handleNextStep,
}: any) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 ${currentStep !== 3 && "opacity-60"}`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Payment Method
          </h2>
        </div>
        {currentStep > 3 && (
          <button
            onClick={() => setCurrentStep(3)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Edit
          </button>
        )}
      </div>

      {currentStep === 3 ? (
        <div>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-gray-900"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <p className="font-medium text-gray-900">
                          {method.name}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </label>
              );
            })}
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
              Review Order
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          <p>{paymentMethods.find((m) => m.id === paymentMethod)?.name}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
