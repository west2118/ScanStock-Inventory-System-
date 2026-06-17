import {
  Package,
  Truck,
  Clock,
  XCircle,
  RotateCcw,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

const OrdersTab = ({ activeTab, setActiveTab, stats }: any) => {
  const tabs = [
    {
      id: "all",
      label: "All Orders",
      icon: Package,
      count: stats?.total || 0,
    },
    {
      id: "pending",
      label: "Pending",
      icon: Clock,
      count: stats?.pending || 0,
    },
    {
      id: "processing",
      label: "Processing",
      icon: RefreshCw,
      count: stats?.processing || 0,
    },
    {
      id: "shipped",
      label: "Shipped",
      icon: Truck,
      count: stats?.shipped || 0,
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: CheckCircle,
      count: stats?.delivered || 0,
    },
    {
      id: "returned",
      label: "Returned",
      icon: RotateCcw,
      count: stats?.returned || 0,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: XCircle,
      count: stats?.cancelled || 0,
    },
  ];

  return (
    <div className="border-b border-gray-200 mb-6 overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              <span
                className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersTab;
