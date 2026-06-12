import ReviewOrder from "./ReviewOrder";
import PaymentMethod from "./PaymentMethod";
import DeliveryMethod from "./DeliveryMethod";
import ShippingAddress from "./ShippingAddress";
import type { CheckoutFormData, CheckoutItem } from "../../../utils/types";

type CheckoutContentProps = {
  cartItems: CheckoutItem[];
  currentStep: number;
  formData: CheckoutFormData;
  setField: (name: string, value: any) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleAddressChange: (e: any) => void;
  handleSubmitOrder: () => void;
};

const CheckoutContent = ({
  cartItems,
  currentStep,
  formData,
  setField,
  handleNextStep,
  handlePrevStep,
  handleAddressChange,
  handleSubmitOrder,
}: CheckoutContentProps) => {
  return (
    <div className="lg:col-span-2">
      {currentStep === 1 && (
        <ShippingAddress
          formData={formData}
          handleAddressChange={handleAddressChange}
          currentStep={currentStep}
          handleNextStep={handleNextStep}
        />
      )}

      {currentStep === 2 && (
        <DeliveryMethod
          formData={formData}
          setField={setField}
          currentStep={currentStep}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      )}

      {currentStep === 3 && (
        <PaymentMethod
          formData={formData}
          setField={setField}
          currentStep={currentStep}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      )}

      {currentStep === 4 && (
        <ReviewOrder
          cartItems={cartItems}
          formData={formData}
          handlePrevStep={handlePrevStep}
          handleSubmitOrder={handleSubmitOrder}
        />
      )}
    </div>
  );
};

export default CheckoutContent;
