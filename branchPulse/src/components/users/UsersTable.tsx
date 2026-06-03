import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Search, Filter, RefreshCw, Activity, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchTableData } from "../../lib/utils";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import UsersTableRow from "./UsersTableRow";
import { useTableParams } from "../../hooks/useTableParams";
import type { UserType } from "../../lib/types";
import Pagination from "../Pagination";
import TableRowErrorHandling from "../skeletons/TableRowErrorHandling";
import SkeletonTableRow from "../skeletons/SkeletonTableRow";
import TableRowNoData from "../skeletons/TableRowNoData";

type UsersData = {
  users: UserType[];
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
};

type UsersTableProps = {
  handleEditUser: (user: UserType) => void;
  handleCreateUser: () => void;
};

const UsersTable = ({ handleEditUser, handleCreateUser }: UsersTableProps) => {
  const { params, setParams } = useTableParams({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    role: "",
  });

  const filters = useMemo(
    () => ({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search || "",
      status: params.status || "",
      role: params.role || "",
    }),
    [params],
  );

  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounceInput(searchInput);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setParams({
        search: debouncedSearch,
        page: 1,
      });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const { data, isLoading, isError, refetch } = useQuery<UsersData>({
    queryKey: ["users-data", filters],
    queryFn: fetchTableData(`${import.meta.env.VITE_API_URL}/users`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Integrated Header with Search and Filters */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                System Users
              </h3>
            </div>
            <button
              onClick={() => refetch()}
              className="p-2 border border-gray-200 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Search and Filters Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name, email, or role..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filters.role}
                  onChange={(e) =>
                    setParams({
                      role: e.target.value,
                      page: 1,
                    })
                  }
                  className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="">All Roles</option>
                  <option value="central_admin">Central Admin</option>
                  <option value="admin">Admin</option>
                  <option value="branch_manager">Branch Manager</option>
                  <option value="inventory_staff">Inventory Staff</option>
                  <option value="cashier">Cashier</option>
                </select>
              </div>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
                <Activity className="w-4 h-4 text-gray-400" />
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setParams({
                      status: e.target.value,
                      page: 1,
                    })
                  }
                  className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button
                onClick={handleCreateUser}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                User
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Contact
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Role
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Assigned Branch
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              {/* <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                Last Active
              </th> */}
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && <SkeletonTableRow columns={6} />}

            {!isLoading && isError && (
              <TableRowErrorHandling col={6} title="users" refetch={refetch} />
            )}

            {!isLoading &&
              !isError &&
              data?.users.map((user) => (
                <UsersTableRow
                  key={user.id}
                  user={user}
                  handleEditUser={handleEditUser}
                />
              ))}

            {!isLoading && !isError && data?.users?.length === 0 && (
              <TableRowNoData title="users" col={6} />
            )}
          </tbody>

          <Pagination
            limit={params.limit}
            page={params.page}
            total={data?.pagination.total}
            totalPages={data?.pagination.totalPages}
            setPage={(newPage) => setParams({ page: newPage })}
            setLimit={(newLimit) => setParams({ limit: newLimit, page: 1 })}
            col={7}
          />
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
