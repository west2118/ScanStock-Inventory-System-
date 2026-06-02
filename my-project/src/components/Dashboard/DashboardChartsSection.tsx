import { TrendingUp, Box, Laptop } from "lucide-react";
import BarChartCard from "../../components/Charts/BarChartCard";
import DashboardCard from "../../components/UI/ChartCard";
import LineChartCard from "../../components/Charts/AreaChartCard";
import HorizontalBarChartCard from "../../components/Charts/HorizontalBarChartCard";
import CategoryStockChartCard from "../../components/Charts/CategoryStockChartCard";
import type { DashboardChartsType } from "../../utils/types";

const DashboardChartsSection = ({
  chartsData,
}: {
  chartsData: DashboardChartsType;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Weekly Stock Movement */}
      <DashboardCard
        title="Weekly Stock Movement"
        subtitle="Last 7 days"
        icon={TrendingUp}
      >
        <BarChartCard data={chartsData.weeklyStockMovement} />
      </DashboardCard>

      {/* Stock by Category */}
      <DashboardCard
        title="Stock by Category"
        subtitle="Last 7 days"
        icon={Box}
      >
        <CategoryStockChartCard data={chartsData.stockCategory} />
      </DashboardCard>

      {/* Monthly Inventory Trend */}
      <DashboardCard
        title="Best Selling Products"
        subtitle="Last 7 days"
        icon={Laptop}
      >
        <HorizontalBarChartCard data={chartsData.bestSellingProducts} />
      </DashboardCard>

      {/* Net Change Line Chart */}
      <DashboardCard
        title="Net Change"
        subtitle="Last 7 days"
        icon={TrendingUp}
      >
        <LineChartCard data={chartsData.netChange} />
      </DashboardCard>
    </div>
  );
};

export default DashboardChartsSection;
