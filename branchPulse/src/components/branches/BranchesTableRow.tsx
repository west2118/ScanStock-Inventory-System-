import {
  CheckCircle,
  Eye,
  Power,
  PowerOff,
  Trash2,
  XCircle,
} from "lucide-react";
import type { BranchType } from "../../lib/types";
import { pesoFormatter } from "../../lib/utils";

type BranchesTableRowProps = {
  branch: BranchType;
  handleCreateBranch: () => void;
  handleViewBranch: (branch: any) => void;
  handleEditBranch: (branch: any) => void;
};

const BranchesTableRow = ({
  branch,
  handleCreateBranch,
  handleViewBranch,
  handleEditBranch,
}: BranchesTableRowProps) => {
  // Status Badge Component
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

  return (
    <tr key={branch.id} className="hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div>
          <p className="font-medium text-gray-900">{branch.branchName}</p>
          <p className="text-xs text-gray-400">{branch.branchCode}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <div>
          <p className="text-sm text-gray-600">
            {branch.location.split(",")[0]}
          </p>
          <p className="text-xs text-gray-400">{branch.region}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        {branch.managerId ? (
          <div>
            <p className="text-sm text-gray-700">{branch.manager ?? "-"}</p>
            <p className="text-xs text-gray-400">
              {branch.managerEmail ?? "-"}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-700">Unassigned</p>
        )}
      </td>
      <td className="py-3 px-4 text-center">
        <StatusBadge status={branch.status} />
      </td>
      <td className="py-3 px-4 text-right">
        <p className="font-semibold text-gray-900">
          {pesoFormatter.format(branch.totalSales)}
        </p>
        <p className="text-xs text-gray-400">MTD</p>
      </td>
      <td className="py-3 px-4 text-right">
        <p className="font-semibold text-gray-900">{branch.totalInventory}</p>
        <p className="text-xs text-gray-400">units</p>
      </td>
      <td className="py-3 px-4 text-center">
        <div className="flex items-center justify-center gap-1">
          <div className="w-16 bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${0}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {/* {branch.productivity ?? 0}% */}
            {0}%
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleViewBranch(branch)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className={`p-1.5 rounded-lg transition-colors ${
              branch.status === "active"
                ? "text-red-600 hover:bg-red-50"
                : "text-green-600 hover:bg-green-50"
            }`}
            title={branch.status === "active" ? "Deactivate" : "Activate"}
          >
            {branch.status === "active" ? (
              <PowerOff className="w-4 h-4" />
            ) : (
              <Power className="w-4 h-4" />
            )}
          </button>
          <button
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BranchesTableRow;
