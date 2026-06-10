// CheckoutPage.jsx
import { useState } from "react";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import ShippingAddress from "../../components/store/Checkout/ShippingAddress";
import DeliveryMethod from "../../components/store/Checkout/DeliveryMethod";
import PaymentMethod from "../../components/store/Checkout/PaymentMethod";
import ReviewOrder from "../../components/store/Checkout/ReviewOrder";
import StepIndicator from "../../components/store/Badges/StepIndicator";
import OrderPlaced from "./OrderPlaced";
import OrderSummary from "../../components/store/Checkout/OrderSummary";
import { deliveryMethods, paymentMethods } from "../../utils/constants";
import { useForm } from "../../hooks/useForm";

type FormData = {
  firstName: "";
  lastName: "";
  email: "";
  phone: "";
  addressLine: "";
  barangay: "";
  city: "";
  province: "";
  postalCode: "";
  landmark: "";
};
const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [notes, setNotes] = useState("cod");
  const [discount, setDiscount] = useState("cod");
  const { formData, handleChange, setField } = useForm<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine: "",
    barangay: "",
    city: "",
    province: "",
    postalCode: "",
    landmark: "",
  });

  // Cart Summary Data
  const cartItems = [
    {
      id: 1,
      name: "ASUS ROG Strix RTX 4090 OC",
      brand: "ASUS",
      price: 124995,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Intel Core i9-13900K",
      brand: "Intel",
      price: 32995,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Samsung 990 Pro 2TB",
      brand: "Samsung",
      price: 12995,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop",
    },
  ];

  // Shipping Address Form
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    saveAddress: false,
  });

  // Saved Addresses
  const savedAddresses = [
    {
      id: 1,
      name: "Home",
      address: "123 Tech Avenue, Makati City",
      isDefault: true,
    },
    {
      id: 2,
      name: "Office",
      address: "456 Digital Hub, BGC Taguig",
      isDefault: false,
    },
  ];

  const [showAddressForm, setShowAddressForm] = useState(true);
  const [selectedSavedAddress, setSelectedSavedAddress] = useState(null);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = deliveryMethod === "express" ? 299 : 0;
  const total = subtotal + shippingCost;

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStepStatus = (step) => {
    if (currentStep > step) return "completed";
    if (currentStep === step) return "current";
    return "pending";
  };

  const handleSubmitOrder = () => {
    console.log(formData);
  };

  if (orderPlaced) {
    return <OrderPlaced />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicators */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-center">
            <StepIndicator
              step={1}
              title="Shipping"
              status={getStepStatus(1)}
            />
            <StepIndicator
              step={2}
              title="Delivery"
              status={getStepStatus(2)}
            />
            <StepIndicator step={3} title="Payment" status={getStepStatus(3)} />
            <StepIndicator step={4} title="Review" status={getStepStatus(4)} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Address */}
            <ShippingAddress
              formData={formData}
              handleChange={handleChange}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              savedAddresses={savedAddresses}
              selectedSavedAddress={selectedSavedAddress}
              setSelectedSavedAddress={setSelectedSavedAddress}
              handleAddressChange={handleAddressChange}
              setShippingAddress={setShippingAddress}
              handleNextStep={handleNextStep}
            />

            {/* Step 2: Delivery Method */}
            <DeliveryMethod
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              handlePrevStep={handlePrevStep}
              handleNextStep={handleNextStep}
            />

            {/* Step 3: Payment Method */}
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              handlePrevStep={handlePrevStep}
              handleNextStep={handleNextStep}
            />

            {/* Step 4: Review Order */}
            {currentStep === 4 && (
              <ReviewOrder
                cartItems={cartItems}
                selectedSavedAddress={selectedSavedAddress}
                shippingAddress={shippingAddress}
                deliveryMethods={deliveryMethods}
                deliveryMethod={deliveryMethod}
                paymentMethods={paymentMethods}
                paymentMethod={paymentMethod}
                handlePrevStep={handlePrevStep}
                handlePlaceOrder={handlePlaceOrder}
                handleSubmitOrder={handleSubmitOrder}
              />
            )}
          </div>

          {/* Order Summary - Right Column */}
          <OrderSummary
            subtotal={subtotal}
            shippingCost={shippingCost}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
