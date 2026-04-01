export type UserType = {
  id: number;
  name: string;
  username: string;
  role: string;
  status: string;
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
