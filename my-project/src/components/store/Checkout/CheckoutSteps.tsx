import StepIndicator from "../Badges/StepIndicator";

const CheckoutSteps = ({ currentStep }: { currentStep: number }) => {
  const getStepStatus = (step: number) => {
    if (currentStep > step) return "completed";
    if (currentStep === step) return "current";
    return "pending";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-center">
        <StepIndicator step={1} title="Shipping" status={getStepStatus(1)} />
        <StepIndicator step={2} title="Delivery" status={getStepStatus(2)} />
        <StepIndicator step={3} title="Payment" status={getStepStatus(3)} />
        <StepIndicator step={4} title="Review" status={getStepStatus(4)} />
      </div>
    </div>
  );
};

export default CheckoutSteps;
