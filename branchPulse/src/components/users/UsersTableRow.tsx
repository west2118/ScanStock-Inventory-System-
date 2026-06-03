import type { UserType } from "../../lib/types";
import RoleBadge from "../badges/RoleBadge";
import StatusBadge from "../badges/StatusBadge";
import { Edit2, Key, Lock, Trash2, Unlock } from "lucide-react";

const UsersTableRow = ({
  user,
  handleEditUser,
}: {
  user: UserType;
  handleEditUser: (user: UserType) => void;
}) => {
  return (
    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            {user.name.split(" ").map((s) => s.charAt(0))}
          </div>
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-400">{user.username}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-xs text-gray-400">{user.contact}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <RoleBadge role={user.role} />
      </td>
      <td className="py-3 px-4">
        <div>
          <p className="text-sm text-gray-600">{user.branchName}</p>
          <p className="text-xs text-gray-400">{user.branchCode}</p>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        <StatusBadge status={user.status} />
      </td>
      {/* <td className="py-3 px-4 text-center">
        <p className="text-sm text-gray-600">
          {new Date(user.lastActive).toLocaleDateString()}
        </p>
        <p className="text-xs text-gray-400">
          {new Date(user.lastActive).toLocaleTimeString()}
        </p>
      </td> */}
      <td className="py-3 px-4 border-b border-gray-50">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleEditUser(user)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit User"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            className={`p-1.5 rounded-lg transition-colors ${
              user.status === "active"
                ? "text-red-600 hover:bg-red-50"
                : "text-green-600 hover:bg-green-50"
            }`}
            title={user.status === "active" ? "Disable User" : "Enable User"}
          >
            {user.status === "active" ? (
              <Lock className="w-4 h-4" />
            ) : (
              <Unlock className="w-4 h-4" />
            )}
          </button>
          {user.role !== "admin" && (
            <button
              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete User"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UsersTableRow;
