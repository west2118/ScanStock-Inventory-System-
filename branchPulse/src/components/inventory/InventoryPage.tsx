import InventoryStatsSection from "./InventoryStatsSection";
import { fetchData } from "../../lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { InventoryDataType } from "../../lib/types";
import InventoryBranchChart from "../charts/InventoryBranchChart";
import ChartCard from "../ui/ChartCard";
import DistributionChart from "../charts/DistributionChart";
import StockMovementChart from "../charts/StockMovementChart";
import PerformanceComparisonChart from "../charts/PerformanceComparisonChart";
import ProductInventoryTable from "./ProductInventoryTable";

const InventoryPage = () => {
  const { data } = useSuspenseQuery<InventoryDataType>({
    queryKey: ["inventory-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/inventory`),
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      <InventoryStatsSection summaryStatsData={data.summaryStats} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Inventory by Branch Bar Chart */}
        <ChartCard title="Inventory Levels by Branch">
          <InventoryBranchChart
            branchInventory={data?.inventoryLevelsByBranch}
          />
        </ChartCard>

        {/* Category Distribution Pie Chart */}
        <ChartCard title="Inventory by Category">
          <DistributionChart stockDistribution={data?.inventoryByCategory} />
        </ChartCard>
      </div>

      {/* Stock Movement Chart & Branch Value Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Stock Movement Area Chart */}
        <ChartCard title="Stock Movement (Monthly)">
          <StockMovementChart stockMovements={data?.stockMovementsMonthly} />
        </ChartCard>

        <ChartCard title="Inventory Value by Branch">
          <PerformanceComparisonChart
            branchPerformance={data?.inventoryValueByBranch}
          />
        </ChartCard>
      </div>

      {/* Product Inventory Table */}
      <ProductInventoryTable
        productInventoryStatus={data.productInventoryStatus}
      />
    </div>
  );
};

export default InventoryPage;
