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
