import { useSuspenseQuery } from "@tanstack/react-query";
import SalesStatsSection from "./SalesStatsSection";
import { fetchData } from "../../lib/utils";
import type { SalesDataType } from "../../lib/types";
import ChartCard from "../ui/ChartCard";
import SalesComparisonChart from "../charts/SalesComparisonChart";
import SalesOverviewChart from "../charts/SalesOverviewChart";
import PerformanceComparisonChart from "../charts/PerformanceComparisonChart";
import MarketShareChart from "../charts/MarketShareChart";
import BestSellingProductsTable from "./BestSellingProductsTable";

const SalesComparisonPage = () => {
  const { data } = useSuspenseQuery<SalesDataType>({
    queryKey: ["sales-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/sales`),
  });

  console.log(data.salesComparisonMonthly);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      <SalesStatsSection summaryStatsData={data?.summaryStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Sales Comparison (Monthly)">
          <SalesComparisonChart
            salesComparisonMonthly={data?.salesComparisonMonthly}
          />
        </ChartCard>

        <ChartCard title="Branch Performance Comparison">
          <PerformanceComparisonChart
            branchPerformance={data?.branchPerformance}
          />
        </ChartCard>
      </div>

      {/* Sales Trends & Market Share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Revenue by Branch">
          <SalesOverviewChart
            monthlySalesOverview={data?.monthlySalesOverview}
          />
        </ChartCard>

        <ChartCard title="Market Share by Branch">
          <MarketShareChart marketShare={data?.marketShare} />
        </ChartCard>
      </div>

      {/* Best Selling Products Table */}
      <BestSellingProductsTable
        bestSellingProducts={data?.topSellingProductsByBranch}
      />
    </div>
  );
};

export default SalesComparisonPage;
