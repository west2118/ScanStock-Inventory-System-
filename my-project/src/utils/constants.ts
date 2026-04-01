import {
  Package,
  LayoutDashboard,
  History,
  Users,
  Settings,
  ClipboardList,
  Code,
  Box,
} from "lucide-react";

// Navigation items
export const navigation = [
  {
    id: "",
    name: "Dashboard",
    roles: ["admin"],
    icon: LayoutDashboard,
  },
  { id: "products", name: "Products", roles: ["admin", "staff"], icon: Box },
  {
    id: "inventory",
    name: "Inventory",
    roles: ["admin", "staff"],
    icon: Package,
  },
  { id: "scan", name: "Scan Barcode", roles: ["admin", "staff"], icon: Code },
  {
    id: "movements",
    name: "Movements",
    roles: ["admin"],
    icon: History,
  },
  {
    id: "reports",
    name: "Reports",
    roles: ["admin"],
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
