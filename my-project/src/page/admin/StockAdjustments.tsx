import {
  Package,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import StockAdjustmentsTable from "../../components/Admin/Stock-Adjustments/StockAdjustmentsTable";
import StockAdjustmentNewModal from "../../components/Admin/Stock-Adjustments/StockAdjustmentNewModal";
import type { StockAdjustmentType } from "../../utils/types";
import { useState } from "react";

const StockAdjustmentsPage = () => {
  const [selectedStockAdjustment, setSelectedStockAdjustment] =
    useState<StockAdjustmentType | null>(null);
  const [modalType, setModalType] = useState<"view" | "create" | "edit" | null>(
    null,
  );

  const handleViewStockAdjustment = (stockAdjustment: StockAdjustmentType) => {
    setSelectedStockAdjustment(stockAdjustment);
    setModalType("view");
  };

  // Edit StockAdjustment
  const handleEditStockAdjustment = (stockAdjustment: StockAdjustmentType) => {
    setSelectedStockAdjustment(stockAdjustment);
    setModalType("edit");
  };

  // Create StockAdjustment
  const handleCreateStockAdjustment = () => {
    setSelectedStockAdjustment(null);
    setModalType("create");
  };

  const handleCloseModal = () => {
    setSelectedStockAdjustment(null);
    setModalType(null);
  };

  const isFormModalOpen = modalType === "create" || modalType === "edit";
  const isDetailsModalOpen = modalType === "view";

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Package size={18} className="text-blue-500" />
            <span className="text-xs text-gray-400">Total Adjustments</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{0}</p>
          <p className="text-xs text-gray-500 mt-1">transactions</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={18} className="text-green-500" />
            <span className="text-xs text-gray-400">Stock Additions</span>
          </div>
          <p className="text-2xl font-bold text-green-600">+{0}</p>
          <p className="text-xs text-gray-500 mt-1">units added</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingDown size={18} className="text-red-500" />
            <span className="text-xs text-gray-400">Stock Removals</span>
          </div>
          <p className="text-2xl font-bold text-red-600">-{0}</p>
          <p className="text-xs text-gray-500 mt-1">units removed</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity size={18} className="text-purple-500" />
            <span className="text-xs text-gray-400">Net Change</span>
          </div>
          <p
            className={`text-2xl font-bold ${10 >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {10 >= 0 ? "+" : ""}
            {10}
          </p>
          <p className="text-xs text-gray-500 mt-1">overall balance</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock size={18} className="text-yellow-500" />
            <span className="text-xs text-gray-400">Pending Approval</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{0}</p>
          <p className="text-xs text-gray-500 mt-1">awaiting review</p>
        </div>
      </div>

      <StockAdjustmentsTable
        handleViewStockAdjustment={handleViewStockAdjustment}
      />

      <StockAdjustmentNewModal
        isModalOpen={isDetailsModalOpen}
        isCloseModal={handleCloseModal}
        selectedStockAdjustment={selectedStockAdjustment}
      />
    </main>
  );
};

export default StockAdjustmentsPage;
