import {
  Package,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import StockAdjustmentsTable from "../../components/Admin/Stock-Adjustments/StockAdjustmentsTable";
import type { StockAdjustmentType } from "../../utils/types";
import { useState } from "react";
import StockAdjustmentDetailsModal from "../../components/Admin/Stock-Adjustments/StockAdjustmentDetailsModal";
import ApproveStockAdjustmentModal from "../../components/Admin/Stock-Adjustments/ApproveStockAdjustmentModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import RejectStockAdjustmentModal from "../../components/Admin/Stock-Adjustments/RejectStockAdjustmentModal";
import StockAdjustmentSummaryStats from "../../components/Admin/Stock-Adjustments/StockAdjustmentSummaryStats";

const StockAdjustmentsPage = () => {
  const [selectedStockAdjustment, setSelectedStockAdjustment] =
    useState<StockAdjustmentType | null>(null);
  const [modalType, setModalType] = useState<
    "view" | "create" | "approve" | "reject" | null
  >(null);
  const queryClient = useQueryClient();

  const handleApproveStockAdjustment = (
    stockAdjustment: StockAdjustmentType,
  ) => {
    setSelectedStockAdjustment(stockAdjustment);
    setModalType("approve");
  };

  const handleRejectStockAdjustment = (
    stockAdjustment: StockAdjustmentType,
  ) => {
    setSelectedStockAdjustment(stockAdjustment);
    setModalType("reject");
  };

  const handleViewStockAdjustment = (stockAdjustment: StockAdjustmentType) => {
    setSelectedStockAdjustment(stockAdjustment);
    setModalType("view");
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

  const approveMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:5001/api/stock-adjustments/${selectedStockAdjustment?.id}/approve`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Approve stock adjustment failed");
      }

      return data;
    },
    onSuccess: (response) => {
      handleCloseModal();
      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["products-data"] });
      queryClient.invalidateQueries({ queryKey: ["stock-adjustments-data"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (rejectionReason: string) => {
      const response = await fetch(
        `http://localhost:5001/api/stock-adjustments/${selectedStockAdjustment?.id}/reject`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rejectionReason }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Reject stock adjustment failed");
      }

      return data;
    },
    onSuccess: (response) => {
      handleCloseModal();
      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["products-data"] });
      queryClient.invalidateQueries({ queryKey: ["stock-adjustments-data"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const isFormModalOpen = modalType === "create";
  const isDetailsModalOpen = modalType === "view";
  const isApproveModalOpen = modalType === "approve";
  const isRejectModalOpen = modalType === "reject";

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      {/* Summary Cards */}
      <StockAdjustmentSummaryStats />

      <StockAdjustmentsTable
        handleViewStockAdjustment={handleViewStockAdjustment}
        handleApproveStockAdjustment={handleApproveStockAdjustment}
        handleRejectStockAdjustment={handleRejectStockAdjustment}
      />

      {isDetailsModalOpen && (
        <StockAdjustmentDetailsModal
          isModalOpen={isDetailsModalOpen}
          isCloseModal={handleCloseModal}
          stockAdjustment={selectedStockAdjustment}
        />
      )}

      {isApproveModalOpen && (
        <ApproveStockAdjustmentModal
          isModalOpen={isApproveModalOpen}
          isCloseModal={handleCloseModal}
          stockAdjustment={selectedStockAdjustment}
          onApprove={() => approveMutation.mutate()}
          isApproving={approveMutation.isPending}
        />
      )}

      {isRejectModalOpen && (
        <RejectStockAdjustmentModal
          isModalOpen={isRejectModalOpen}
          isCloseModal={handleCloseModal}
          stockAdjustment={selectedStockAdjustment}
          onReject={(reason) => rejectMutation.mutate(reason)}
          isRejecting={rejectMutation.isPending}
        />
      )}
    </main>
  );
};

export default StockAdjustmentsPage;
