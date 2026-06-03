import { Suspense, useState } from "react";
import BranchAnalyticsCharts from "../components/branches/BranchAnalyticsCharts";
import BranchesTable from "../components/branches/BranchesTable";
import BranchStatsSection from "../components/branches/BranchStatsSection";
import StatsCardsSkeleton from "../components/skeletons/StatsCardsSkeleton";
import type { BranchType } from "../lib/types";
import BranchFormModal from "../components/branches/BranchFormModal";
import BranchDetailsModal from "../components/branches/BranchDetailsModal";
import BranchChartsSkeleton from "../components/branches/BranchChartsSkeleton";

const BranchManagementPage = () => {
  const [selectedBranch, setSelectedBranch] = useState<BranchType | null>(null);
  const [modalType, setModalType] = useState<"view" | "create" | "edit" | null>(
    null,
  );

  const handleViewBranch = (branch: BranchType) => {
    setSelectedBranch(branch);
    setModalType("view");
  };

  // Edit Branch
  const handleEditBranch = (branch: BranchType) => {
    setSelectedBranch(branch);
    setModalType("edit");
  };

  // Create Branch
  const handleCreateBranch = () => {
    setSelectedBranch(null);
    setModalType("create");
  };

  const handleCloseModal = () => {
    setSelectedBranch(null);
    setModalType(null);
  };

  const isFormModalOpen = modalType === "create" || modalType === "edit";
  const isDetailsModalOpen = modalType === "view";

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      <Suspense fallback={<StatsCardsSkeleton />}>
        <BranchStatsSection />
      </Suspense>

      <Suspense fallback={<BranchChartsSkeleton />}>
        <BranchAnalyticsCharts />
      </Suspense>

      <BranchesTable
        handleViewBranch={handleViewBranch}
        handleEditBranch={handleEditBranch}
        handleCreateBranch={handleCreateBranch}
      />

      {isDetailsModalOpen && selectedBranch && (
        <BranchDetailsModal
          selectedBranch={selectedBranch}
          isModalOpen={isDetailsModalOpen}
          isCloseModal={handleCloseModal}
        />
      )}

      {isFormModalOpen && (
        <BranchFormModal
          isModalOpen={isFormModalOpen}
          isCloseModal={handleCloseModal}
          mode={modalType}
        />
      )}
    </div>
  );
};

export default BranchManagementPage;
