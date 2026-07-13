import {
  Package,
  LayoutDashboard,
  History,
  Users,
  Settings,
  ClipboardList,
  Code,
  Box,
  PercentSquareIcon,
  Receipt,
  Package2,
  Banknote,
  CreditCard,
  Wallet,
  Package2Icon,
} from "lucide-react";

// Navigation items
export type NavigationItem = {
  id: string;
  name: string;
  roles: string[];
  icon: any;
  excludeFromCentral?: boolean;
  centralOnly?: boolean;
};

export const navigation: NavigationItem[] = [
  {
    id: "",
    name: "Dashboard",
    roles: ["admin", "branch_manager"],
    icon: LayoutDashboard,
  },
  {
    id: "pos",
    name: "POS",
    roles: ["admin", "branch_manager", "staff"],
    icon: PercentSquareIcon,
    excludeFromCentral: true,
  },
  {
    id: "transactions",
    name: "Transactions",
    roles: ["admin", "branch_manager", "staff"],
    icon: Receipt,
    excludeFromCentral: true,
  },
  {
    id: "orders",
    name: "Orders",
    roles: ["admin", "branch_manager", "staff"],
    icon: Package2Icon,
    centralOnly: true,
  },
  {
    id: "products",
    name: "Products",
    roles: ["admin", "branch_manager", "staff"],
    icon: Box,
  },
  {
    id: "inventory",
    name: "Inventory",
    roles: ["admin", "branch_manager", "staff"],
    icon: Package,
  },
  {
    id: "stock-adjustments",
    name: "Stock Adjustments",
    roles: ["admin", "branch_manager", "staff"],
    icon: Package2,
  },
  {
    id: "scan",
    name: "Scan Barcode",
    roles: ["admin", "branch_manager", "staff"],
    icon: Code,
  },
  {
    id: "movements",
    name: "Movements",
    roles: ["admin", "branch_manager"],
    icon: History,
  },
  {
    id: "reports",
    name: "Reports",
    roles: ["admin", "branch_manager"],
    icon: ClipboardList,
  },
];

export const categories = [
  { value: "cpu", name: "CPU" },
  { value: "motherboard", name: "Motherboard" },
  { value: "gpu", name: "GPU" },
  { value: "ram", name: "RAM" },
  { value: "storage", name: "Storage" },
  { value: "psu", name: "PSU" },
  { value: "case", name: "Case" },
  { value: "cooling", name: "Cooling" },

  { value: "monitor", name: "Monitor" },
  { value: "keyboard", name: "Keyboard" },
  { value: "mouse", name: "Mouse" },
  { value: "audio", name: "Audio" },
  { value: "camera", name: "Camera" },

  { value: "networking", name: "Networking" },
  { value: "cables", name: "Cables" },
  { value: "adapters", name: "Adapters" },

  { value: "external_storage", name: "External Storage" },
  { value: "usb_devices", name: "USB Devices" },
  { value: "power", name: "Power" },

  { value: "accessories", name: "Accessories" },
  { value: "others", name: "Others" },
];

export const vatTypes = [
  { value: "vatable", name: "Vatable" },
  { value: "vat_exempt", name: "VAT Exempt" },
  { value: "zero_rated", name: "Zero Rated" },
];

export const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
];

export const paymentMethods = [
  {
    id: "cod",
    name: "Cash on Delivery",
    icon: Banknote,
    description: "Pay when you receive the item",
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, Amex",
  },
  { id: "gcash", name: "GCash", icon: Wallet, description: "Pay via GCash" },
];

export const deliveryMethods = [
  {
    id: "standard",
    name: "Standard Delivery",
    days: "3-5 business days",
    price: 100,
    minOrder: 0,
  },
  {
    id: "express",
    name: "Express Delivery",
    days: "1-2 business days",
    price: 200,
    minOrder: 0,
  },
  {
    id: "pickup",
    name: "Store Pickup",
    days: "Same day pickup",
    price: 0,
    minOrder: 0,
  },
];
