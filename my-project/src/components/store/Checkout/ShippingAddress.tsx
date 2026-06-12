import { ChevronRight, MapPin } from "lucide-react";
import React from "react";
import type { CheckoutFormData } from "../../../utils/types";

type ShippingAddressType = {
  currentStep: number;
  formData: CheckoutFormData;
  handleAddressChange: (e: any) => void;
  handleNextStep: () => void;
};

const ShippingAddress = ({
  currentStep,
  formData,
  handleAddressChange,
  handleNextStep,
}: ShippingAddressType) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 ${currentStep !== 1 && "opacity-60"}`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Shipping Address
          </h2>
        </div>
        {/* {currentStep > 1 && (
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Edit
          </button>
        )} */}
      </div>

      {currentStep === 1 ? (
        <div>
          {/* Saved Addresses */}
          {/* {savedAddresses.length > 0 && (
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Saved Address
              </label>
              <div className="space-y-2">
                {savedAddresses.map((addr) => (
                  <label
                    key={addr.id}
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="savedAddress"
                      checked={selectedSavedAddress?.id === addr.id}
                      onChange={() => setSelectedSavedAddress(addr)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {addr.name}
                        </span>
                        {addr.isDefault && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {addr.address}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-400">or</span>
                </div>
              </div>
            </div>
          )} */}

          {/* Address Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.address.firstName}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.address.lastName}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.address.email}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.address.phone}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="0912 345 6789"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                name="addressLine"
                value={formData.address.addressLine}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="123 Tech Avenue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Barangay *
              </label>
              <input
                type="text"
                name="barangay"
                value={formData.address.barangay}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="Makati Barangay"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="Makati City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Province *
              </label>
              <input
                type="text"
                name="province"
                value={formData.address.province}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="Metro Manila"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.address.postalCode}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="1234"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landmark
              </label>
              <textarea
                name="landmark"
                value={formData.address.landmark}
                onChange={handleAddressChange}
                className="w-full resize-none px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="1234"
              />
            </div>
          </div>

          {/* <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="saveAddress"
                checked={shippingAddress.saveAddress}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    saveAddress: e.target.checked,
                  })
                }
                className="rounded"
              />
              <span className="text-sm text-gray-600">
                Save this address for future orders
              </span>
            </label>
          </div> */}

          <button
            onClick={handleNextStep}
            className="mt-6 w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            Continue to Delivery
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          {/* {selectedSavedAddress ? (
            <p>{selectedSavedAddress.address}</p>
          ) : shippingAddress.address ? (
            <div>
              <p>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              <p>
                {shippingAddress.address}, {shippingAddress.city}
              </p>
              <p>
                {shippingAddress.province}, {shippingAddress.zipCode}
              </p>
              <p>{shippingAddress.phone}</p>
            </div>
          ) : (
            <p className="text-gray-400">No address added yet</p>
          )} */}
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
