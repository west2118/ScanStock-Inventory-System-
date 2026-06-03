import { useSuspenseQuery } from "@tanstack/react-query";
import type { DashboardDataType } from "../../lib/types";
import { fetchData } from "../../lib/utils";
import DashboardStatsSection from "./DashboardStatsSection";
import TopPerformingCard from "./TopPerformingCard";
import LowestPerformingCard from "./LowestPerformingCard";
import ChartCard from "../ui/ChartCard";
import SalesOverviewChart from "../charts/SalesOverviewChart";
import InventoryStatusChart from "../charts/InventoryStatusChart";
import EmployeeProductivityTable from "./EmployeeProductivityTable";
import PerformanceComparisonChart from "../charts/PerformanceComparisonChart";

const DashboardPage = () => {
  const { data } = useSuspenseQuery<DashboardDataType>({
    queryKey: ["dashboard-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/dashboard`),
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      <DashboardStatsSection summaryStatsData={data?.summaryStats} />

      {/* Top & Lowest Performing Branches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TopPerformingCard topPerforming={data?.topPerforming} />

        <LowestPerformingCard lowPerforming={data?.needsImprovement} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Monthly Sales Overview">
          <SalesOverviewChart
            monthlySalesOverview={data?.monthlySalesOverview}
          />
        </ChartCard>

        <ChartCard title="Inventory Distribution">
          <InventoryStatusChart
            inventoryDistribution={data?.inventoryDistribution}
          />
        </ChartCard>
      </div>

      {/* Employee Productivity Overview & Branch Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Table */}
        <ChartCard title="Employee Productivity Overview">
          <EmployeeProductivityTable
            employeeProductivityOverview={data?.employeeProductivityOverview}
          />
        </ChartCard>

        {/* Branch Performance Bar Chart */}
        <ChartCard title="Branch Performance Comparison">
          <PerformanceComparisonChart
            branchPerformance={data?.branchPerformance}
          />
        </ChartCard>
      </div>
    </div>
  );
};

export default DashboardPage;
