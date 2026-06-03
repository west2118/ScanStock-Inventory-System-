import BranchesTableRow from "./BranchesTableRow";
import { Plus, Search, Store } from "lucide-react";
import { fetchData, fetchTableData } from "../../lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { BranchType } from "../../lib/types";
import Pagination from "../Pagination";
import TableRowErrorHandling from "../skeletons/TableRowErrorHandling";
import SkeletonTableRow from "../skeletons/SkeletonTableRow";
import TableRowNoData from "../skeletons/TableRowNoData";
import { useEffect, useMemo, useState } from "react";
import { useTableParams } from "../../hooks/useTableParams";
import { useDebounceInput } from "../../hooks/useDebounceInput";

type BranchesTableProps = {
  handleViewBranch: (branch: BranchType) => void;
  handleEditBranch: (branch: BranchType) => void;
  handleCreateBranch: () => void;
};

type BranchesData = {
  branches: BranchType[];
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
};

const BranchesTable = ({
  handleViewBranch,
  handleEditBranch,
  handleCreateBranch,
}: BranchesTableProps) => {
  const { params, setParams } = useTableParams({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    region: "",
  });

  const filters = useMemo(
    () => ({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search || "",
      status: params.status || "",
      region: params.region || "",
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

  const { data, isLoading, isError, refetch } = useQuery<BranchesData>({
    queryKey: ["branches-data", filters],
    queryFn: fetchTableData(`${import.meta.env.VITE_API_URL}/branches`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-4 border-b border-gray-200">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search branch..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filters.region}
            onChange={(e) =>
              setParams({
                region: e.target.value,
                page: 1,
              })
            }
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">All Regions</option>
            <option value="Metro Manila">Metro Manila</option>
            <option value="Luzon">Luzon</option>
            <option value="Visayas">Visayas</option>
            <option value="Mindanao">Mindanao</option>
          </select>

          {/* Add Branch Button */}
          <button
            onClick={handleCreateBranch}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Branch
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {/* Column Headers Row */}
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Branch
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Manager
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Sales (MTD)
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Inventory
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Productivity
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {isLoading && <SkeletonTableRow columns={8} />}

              {!isLoading && isError && (
                <TableRowErrorHandling
                  col={8}
                  title="branches"
                  refetch={refetch}
                />
              )}

              {!isLoading &&
                !isError &&
                data?.branches.map((branch: any) => (
                  <BranchesTableRow
                    key={branch.id}
                    branch={branch}
                    handleCreateBranch={handleCreateBranch}
                    handleViewBranch={handleViewBranch}
                    handleEditBranch={handleEditBranch}
                  />
                ))}

              {!isLoading && !isError && data?.branches?.length === 0 && (
                <TableRowNoData title="branches" col={8} />
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
    </div>
  );
};

export default BranchesTable;
