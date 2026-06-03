import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData } from "../../lib/utils";
import type { EmployeeProductivityDataType } from "../../lib/types";
import EmployeeProductivityStatsSection from "./EmployeeProductivityStatsSection";
import SharedBarChart from "../charts/SharedBarChart";
import ChartCard from "../ui/ChartCard";
import ProductivityTrendChart from "../charts/ProductivityTrendChart";
import TopPerformersCard from "./TopPerformersCard";
import NeedsImprovementCard from "./NeedsImprovementCard";
import EmployeeProductivityTable from "./EmployeeProductivityTable";

const EmployeeProductivityPage = () => {
  const { data } = useSuspenseQuery<EmployeeProductivityDataType>({
    queryKey: ["employee-productivity-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/productivity`),
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      {/* KPI Cards */}
      <EmployeeProductivityStatsSection summaryStatsData={data?.summaryStats} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Branch Productivity Comparison */}
        <ChartCard title="Productivity by Branch">
          <SharedBarChart data={data?.productivityByBranch} />
        </ChartCard>

        {/* Productivity Trends Over Time */}
        <ChartCard title="Productivity Trends (Monthly)">
          <ProductivityTrendChart
            productivityTrends={data?.productivityTrendsMonthly}
          />
        </ChartCard>
      </div>

      {/* Top Performers & Bottom Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Performers */}
        <TopPerformersCard topPerformers={data?.topPerformersMonth} />

        {/* Needs Improvement */}
        <NeedsImprovementCard bottomPerformers={data?.needsImprovementMonth} />
      </div>

      <EmployeeProductivityTable
        employeePerformance={data?.employeePerformance}
      />
    </div>
  );
};

export default EmployeeProductivityPage;
