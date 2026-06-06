export type UserType = {
  id: number;
  name: string;
  username: string;
  role: string;
  status: string;
  branchId: number;
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

  type: "IN" | "OUT";
  reference: string;

  handledBy: number;
  handledByName: string;
  handledByRole: string;

  createdAt: string;

  notes?: string;
  category?: string;
};

export type ItemType = {
  id: number;
  sku: string;
  barcode: string;
  price: number;
  productId: number;
  category?: string;
  productName: string;
  quantity: number;
  stock: number;
  stockCritical: number;
  stockHigh: number;
  stockLow: number;
  transactionType: string;
  subtotal?: number;
  vatType?: string;
};

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
  differenceChangeStockIn: number;
  differenceChangeStockOut: number;
  lowStocks: number;
  stockInToday: number;
  stockOutToday: number;
};

export type DashboardChartsType = {
  dateRange: string;
  weeklyStockMovement: {
    date: string;
    label: string;
    value1: number;
    value2: number;
  }[];
  stockCategory: {
    name: string;
    value1: number;
  }[];
  bestSellingProducts: {
    name: string;
    value: number;
  }[];
  netChange: {
    date: string;
    label: string;
    value: number;
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
  adjustmentType: "IN" | "OUT";
  quantity: number;
  remarks: string | null;
};

export type StockAdjustmentType = {
  id: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "voided";

  createdAt: string;
  createdById: number;
  createdByName: string;

  items: StockAdjustmentItemType[];
};

export type PaginationType = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};
