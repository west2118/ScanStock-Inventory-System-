export type OrderAddressType = {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: string;
  landmark: string;
};

export type OrderItemType = {
  id: number;
  productId: number;
  sku: string;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type OrderType = {
  id: number;
  orderNumber: string;
  orderStatus: string;

  deliveryMethod: string;
  notes: string;

  paymentMethod: string;
  paymentStatus: string;
  transactionId: string | null;
  paymentAmount: number;
  paidAt: string | null;

  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  taxAmount: number;
  netSales: number;
  totalAmount: number;

  placedAt: string;
  createdAt: string;

  address: OrderAddressType;
  items: OrderItemType[];
};
