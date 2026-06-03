import { Suspense } from "react";
import UsersTable from "../components/users/UsersTable";
import StatsCardsSkeleton from "../components/skeletons/StatsCardsSkeleton";
import UserStatsSection from "../components/users/UserStatsSection";
import UsersFormModal from "../components/users/UsersFormModal";
import { useCallback, useState } from "react";
import type { UserType } from "../lib/types";
import ResetPasswordModal from "../components/users/ResetPasswordModal";

const UserManagementPage = () => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [modalType, setModalType] = useState<"view" | "create" | "edit" | null>(
    null,
  );

  const handleEditUser = useCallback((user: UserType) => {
    setSelectedUser(user);
    setModalType("edit");
  }, []);

  const handleCreateUser = useCallback(() => {
    setSelectedUser(null);
    setModalType("create");
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedUser(null);
    setModalType(null);
  }, []);

  const isFormModalOpen = modalType === "create" || modalType === "edit";

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      <Suspense fallback={<StatsCardsSkeleton />}>
        <UserStatsSection />
      </Suspense>

      <UsersTable
        handleEditUser={handleEditUser}
        handleCreateUser={handleCreateUser}
      />

      {isFormModalOpen && (
        <UsersFormModal
          isModalOpen={isFormModalOpen}
          isCloseModal={handleCloseModal}
          mode={modalType}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
