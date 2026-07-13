import { TrendingUp, Box, Laptop, BarChart2 } from "lucide-react";
import SalesTrendsChartCard from "../Charts/SalesTrendsChartCard";
import HorizontalBarChartCard from "../Charts/HorizontalBarChartCard";
import CategoryRevenueChartCard from "../Charts/CategoryRevenueChartCard";
import OrderStatusChartCard from "../Charts/OrderStatusChartCard";
import type { DashboardChartsType } from "../../../utils/types";
import DashboardCard from "../UI/ChartCard";
import { useAuth } from "../../../context/AuthContext";
import Past7DaysItemsChartCard from "../Charts/Past7DaysItemsChartCard";

const DashboardChartsSection = ({
  chartsData,
}: {
  chartsData: DashboardChartsType;
}) => {
  const { user } = useAuth();
  const isCentralWarehouse = user?.branchName?.toLowerCase() === "central warehouse" || user?.branchName?.toLowerCase().includes("central");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Sales Trends */}
      <DashboardCard
        title="Sales Trends"
        subtitle="Last 7 days"
        icon={TrendingUp}
      >
        <SalesTrendsChartCard data={chartsData.salesTrends} />
      </DashboardCard>

      {/* Revenue by Category */}
      <DashboardCard
        title="Revenue by Category"
        subtitle="Last 7 days"
        icon={Box}
      >
        <CategoryRevenueChartCard data={chartsData.revenueCategory} />
      </DashboardCard>

      {/* Best Selling Products */}
      <DashboardCard
        title="Best Selling Products"
        subtitle={`Last 7 days (${isCentralWarehouse ? 'Central Warehouse' : 'Store POS'})`}
        icon={Laptop}
      >
        <HorizontalBarChartCard data={chartsData.bestSellingProducts} />
      </DashboardCard>

      {/* Order Status Distribution or Past 7 Days Sales */}
      {isCentralWarehouse ? (
        <DashboardCard
          title="Order Status Distribution"
          subtitle="Next 7 days"
          icon={BarChart2}
        >
          <OrderStatusChartCard data={chartsData.orderStatusDistribution} />
        </DashboardCard>
      ) : (
        <DashboardCard
          title="Past 7 Days Items Sold"
          subtitle="Last 7 days"
          icon={BarChart2}
        >
          <Past7DaysItemsChartCard data={chartsData.orderStatusDistribution} />
        </DashboardCard>
      )}
    </div>
  );
};

export default DashboardChartsSection;
