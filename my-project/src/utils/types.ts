export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  username: string;
  role: string;
  status: string;
  branchId: number;
  branchName: string;
  createdAt: string;
};

export type AuthContextType = {
  user: UserType | null;
  login: (formData: any) => Promise<UserType>;
  logout: () => Promise<void>;
  loading: any;
};

export type ProductType = {
  id: number;
  sku: string;
  barcode: string;
  productName: string;
  price: number;
  category: string;
  location: string;
  status: string;
  vatType: string;
  stock: number;
  stockLow: number;
  stockCritical: number;
  stockHigh: number;
  createdAt: string;
};

export type InventoryMovementType = {
  id: number;
  productId: number;
  productName: string;
  barcode: string;

  quantity: number;
  price: number;

  beforeStock: number;
  afterStock: number;

  movementType: "IN" | "OUT";
  referenceType: string;

  handledBy: number;
  handledByName: string;
  handledByRole: string;

  createdAt: string;

  notes?: string;
  category?: string;
};

// export type ItemType = {
//   id: number;
//   sku: string;
//   barcode: string;
//   price: number;
//   productId: number;
//   category?: string;
//   productName: string;
//   quantity: number;
//   stock: number;
//   stockCritical: number;
//   stockHigh: number;
//   stockLow: number;
//   transactionType: string;
//   subtotal?: number;
//   vatType?: string;
// };

export type TransactionType = {
  changeAmount: string;
  customerCash: string;
  customerName: string;
  discount: string;
  handledBy: string;
  id: number;
  paymentMethod: string;
  subtotal: string;
  totalAmount: string;
  transactionNumber: string;
  vat: string;
  items: ItemType[];
  transactType: string;
  createdAt: string;
  status: string;
  customerTin: string;
  grossSales: number;
  vatableSales: number;
  vatExemptSales: number;
  zeroRatedSales: number;
  totalSales: number;
  vatAmount: number;
  notes: string;
  voidReason: string;
  voidedBy: string;
  voidedAt: string;
};

export type DashboardSummaryType = {
  availableStock: number;
  differenceChangeRevenue: number;
  differenceChangeItemsSale: number;
  lowStocks: number;
  revenueToday: number;
  itemsSaleToday: number;
};

export type DashboardChartsType = {
  dateRange: string;
  salesTrends: {
    date: string;
    label: string;
    value1: number;
  }[];
  revenueCategory: {
    name: string;
    value1: number;
  }[];
  bestSellingProducts: {
    name: string;
    value: number;
  }[];
  orderStatusDistribution: {
    date: string;
    label: string;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
  }[];
  lowStock: {
    id: number;
    sku: string;
    productName: string;
    stock: number;
    stockCritical: number;
    stockLow: number;
  }[];
  recentMovements: {
    id: number;
    createdAt: string;
    handledBy: string;
    productName: string;
    quantity: number;
    type: string;
  }[];
};

export type DashboardDataType = {
  summary: DashboardSummaryType;
  charts: DashboardChartsType;
};

export type StockAdjustmentItemType = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  prevStock: number;
  newStock: number;
  remarks: string | null;
};

export type StockAdjustmentType = {
  id: number;
  adjustmentType: string;
  adjustmentReason: string;
  status: string;
  createdAt: string;
  handledAt: string | null;
  handledBy: string | null;
  createdById: number;
  createdByName: string;
  reason: string | null;
  items: StockAdjustmentItemType[];
};

export type PaginationType = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type ProductsData = {
  products: ProductType[];
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
};

export type ItemType = {
  id: number;
  productId: number;
  productName: string;
  sku: string;
  currentStock: number;
  quantity: number;
  remarks: string;
};

export type ProductImageType = {
  id: number;
  imageUrl: string;
  sortOrder: number;
  isPrimary: boolean;
};

export type ProductSpecificationType = {
  id: number;
  name: string;
  value: string;
};

export type ProductReviewType = {
  avatar: string
  content: string
  date: string
  id: number
  rating: number
  title: string
  user: string
  verified: boolean
}

export type ProductDetailsType = {
  id: number;

  sku: string;
  barcode: string;
  slug: string;

  productName: string;
  shortDescription: string;
  description: string;
  features: string;

  stock: number;

  originalPrice: string;
  price: string;

  status: string;
  vatType: string;

  categoryId: number;
  categoryName: string;

  brandId: number;
  brandName: string;

  createdAt: string;
  updatedAt: string;

  images: ProductImageType[];
  specifications: ProductSpecificationType[];
  reviews?: ProductReviewType[];
  branchAvailability?: {
    branch: string;
    address: string;
    phone: string;
    stock: number;
  }[];
};

export type CartItem = {
  id: number;
  productId: number;
  brandName: string;
  productName: string;
  sku: string;
  imageUrl: string;
  price: string;
  stock: number;
  quantity: number;
  isSelected: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CheckoutItem = {
  id: number;
  productId: number;

  imageUrl: string;
  brandName: string;
  productName: string;
  slug: string;
  sku: string;
  barcode: string;

  price: number;
  currentPrice: string;

  quantity: number;

  vatType: "vatable" | "zero-rated" | "exempt";
};

export type CheckoutFormData = {
  address: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressLine: string;
    barangay: string;
    city: string;
    province: string;
    postalCode: string;
    landmark: string;
  };
  deliveryMethod: string;
  paymentMethod: string;
  notes: string;
  discountAmount: number;
};
