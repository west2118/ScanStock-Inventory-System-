import {
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  RefreshCw,
  Truck,
} from "lucide-react";
import { pesoFormatter } from "../../../utils/utils";

const OrdersSummaryStats = ({ stats }: any) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-1">
          <Package size={16} className="text-blue-500" />
          <span className="text-xs text-gray-400">Total</span>
        </div>
        <p className="text-xl font-bold text-gray-900">{stats?.total || 0}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-1">
          <Clock size={16} className="text-yellow-500" />
          <span className="text-xs text-gray-400">Pending</span>
        </div>
        <p className="text-xl font-bold text-yellow-600">{stats?.pending || 0}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-1">
          <RefreshCw size={16} className="text-blue-500" />
          <span className="text-xs text-gray-400">Processing</span>
        </div>
        <p className="text-xl font-bold text-blue-600">{stats?.processing || 0}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-1">
          <Truck size={16} className="text-purple-500" />
          <span className="text-xs text-gray-400">Shipped</span>
        </div>
        <p className="text-xl font-bold text-purple-600">{stats?.shipped || 0}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-1">
          <CheckCircle size={16} className="text-green-500" />
          <span className="text-xs text-gray-400">Delivered</span>
        </div>
        <p className="text-xl font-bold text-green-600">{stats?.delivered || 0}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-1">
          <DollarSign size={16} className="text-green-500" />
          <span className="text-xs text-gray-400">Revenue</span>
        </div>
        <p className="text-xl font-bold text-gray-900">{pesoFormatter.format(stats?.revenue || 0)}</p>
      </div>
    </div>
  );
};

export default OrdersSummaryStats;
