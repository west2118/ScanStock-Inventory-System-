import { Crown, UserCog, Users, Eye, Settings } from "lucide-react";

const roleConfig = {
  central_admin: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    label: "Central Admin",
    icon: Crown,
  },

  admin: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: "Admin",
    icon: Settings,
  },

  branch_manager: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "Branch Manager",
    icon: UserCog,
  },

  cashier: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Cashier",
    icon: Users,
  },

  inventory_staff: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "Inventory Staff",
    icon: Users,
  },
};

const RoleBadge = ({ role }: { role: string }) => {
  const config = roleConfig[role] || roleConfig.viewer;

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};

export default RoleBadge;
