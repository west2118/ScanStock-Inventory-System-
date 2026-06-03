import {
  Calendar,
  CheckCircle,
  MapPin,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import Modal from "../ui/Modal";
import type { BranchType } from "../../lib/types";

type BranchDetailsModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedBranch: BranchType;
};

const StatusBadge = ({ status }: { status: any }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
      status === "active"
        ? "bg-green-100 text-green-700 dark:text-green-400"
        : "bg-red-100 text-red-700 dark:text-red-400"
    }`}
  >
    {status === "active" ? (
      <CheckCircle className="w-3 h-3" />
    ) : (
      <XCircle className="w-3 h-3" />
    )}
    {status === "active" ? "Active" : "Inactive"}
  </span>
);

const BranchDetailsModal = ({
  isModalOpen,
  isCloseModal,
  selectedBranch,
}: BranchDetailsModalProps) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Branch Details"
      width="max-w-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-2xl font-bold text-gray-900">
            {selectedBranch.branchName}
          </h4>
          <p className="text-gray-500">{selectedBranch.branchCode}</p>
        </div>
        <StatusBadge status={selectedBranch.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Location</p>
              <p className="text-sm text-gray-500">{selectedBranch.location}</p>
              <p className="text-xs text-gray-400">{selectedBranch.region}</p>
            </div>
          </div>
          {/* <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Branch Manager
              </p>
              <p className="text-sm text-gray-500">
                {selectedBranch.managerName}
              </p>
              <p className="text-xs text-gray-400">
                {selectedBranch.managerUsername}
              </p>
            </div>
          </div> */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Contact Number
              </p>
              <p className="text-sm text-gray-500">
                {selectedBranch.branchCode}
              </p>
            </div>
          </div>
          {/* <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Established</p>
                <p className="text-sm text-gray-500">
                  {new Date(selectedBranch.established).toLocaleDateString()}
                </p>
              </div>
            </div> */}
        </div>

        <div className="space-y-4">
          <div className="shadow-md rounded-xl p-4">
            <p className="text-sm text-gray-500">Sales Summary (MTD)</p>
            <p className="text-2xl font-bold text-gray-900">
              ₱{selectedBranch.totalSales.toLocaleString()}
            </p>
          </div>
          <div className="shadow-md rounded-xl p-4">
            <p className="text-sm text-gray-500">Inventory Summary</p>
            <p className="text-2xl font-bold text-gray-900">
              {selectedBranch.totalInventory.toLocaleString()} units
            </p>
          </div>
          {/* <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Employee Productivity</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${selectedBranch.productivity}%` }}
                  />
                </div>
                <span className="font-semibold">
                  {selectedBranch.productivity}%
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {selectedBranch.employees} employees
              </p>
            </div> */}
        </div>
      </div>
    </Modal>
  );
};

export default BranchDetailsModal;
