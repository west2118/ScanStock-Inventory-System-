import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData } from "../../lib/utils";
import PodiumSection from "./PodiumSection";
import type { LeaderboardDataType } from "../../lib/types";
import BranchRankingsTable from "./BranchRankingsTable";
import EmployeeLeaderboard from "./EmployeeLeaderboardTable";
import BestSellingProductsTable from "./BestSellingProductsTable";

const BranchLeaderboardsPage = () => {
  const { data } = useSuspenseQuery<LeaderboardDataType>({
    queryKey: ["leaderboard-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/leaderboards`),
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      {/* Podium Section - Top 3 Branches */}
      <PodiumSection
        branchPerformanceRanking={data?.branchPerformanceRanking}
      />

      {/* Branch Rankings Table */}
      <BranchRankingsTable branchRankings={data.branchPerformanceRanking} />

      {/* Employee Leaderboard */}
      <EmployeeLeaderboard employeeRankings={data?.employeePerformance} />

      {/* Best Selling Products Rankings */}
      <BestSellingProductsTable
        productRankings={data?.productBestPerformanceRanking}
      />

      {/* Export Modal */}
      {/* {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Export Leaderboard Report
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <option>Excel (.xlsx)</option>
                  <option>CSV (.csv)</option>
                  <option>PDF (.pdf)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Include Data
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Branch Rankings
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Employee Rankings
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Product Rankings
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Performance Charts
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Period
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <option>Current Period</option>
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Download Report
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default BranchLeaderboardsPage;
