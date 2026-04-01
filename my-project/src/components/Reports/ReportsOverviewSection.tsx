import DashboardCard from "../UI/ChartCard";
import CategoryStockChartCard from "../Charts/CategoryStockChartCard";
import { TrendingUp } from "lucide-react";
import BarChartCard from "../Charts/BarChartCard";
import DashboardLowStock from "../Dashboard/DashboardLowStock";
import OneBarChartCard from "../Charts/OneBarChartCard";
import CardChartLoader from "../CardLoader";
import TableCardSkeleton from "../Skeletons/TableCardSkeleton";

type ReportsOverviewSectionProps = {
  data: {
    revenueTrend: {
      date: string;
      label: string;
      value: number;
    }[];
    categoryPerformance: {
      name: string;
      value1: number;
      value2: number;
    }[];
    stockMovements: {
      date: string;
      label: string;
      value1: number;
      value2: number;
    }[];
    lowStock: {
      id: number;
      sku: string;
      productName: string;
      stock: number;
      stockCritical: number;
      stockLow: number;
    }[];
  };
  isLoading: boolean;
};

const ReportsOverviewSection = ({
  data,
  isLoading,
}: ReportsOverviewSectionProps) => {
  return (
    <>
      {/* Revenue & Profit Trend */}
      <CardChartLoader isLoading={isLoading}>
        <DashboardCard
          title="Revenue & Profit Trend"
          subtitle="Last 7 days"
          icon={TrendingUp}
        >
          <OneBarChartCard data={data?.revenueTrend ?? []} />
        </DashboardCard>
      </CardChartLoader>

      {/* Category Performance & Stock Movement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        {/* Category Performance   */}

        <CardChartLoader isLoading={isLoading}>
          <DashboardCard
            title="Category Performance"
            subtitle="Last 7 days"
            icon={TrendingUp}
          >
            <CategoryStockChartCard data={data?.categoryPerformance ?? []} />
          </DashboardCard>
        </CardChartLoader>

        <CardChartLoader isLoading={isLoading}>
          <DashboardCard
            title="Stock Movements"
            subtitle="Last 7 days"
            icon={TrendingUp}
          >
            <BarChartCard data={data?.stockMovements ?? []} />
          </DashboardCard>
        </CardChartLoader>
      </div>

      {/* Low Stock Alert */}
      <CardChartLoader isLoading={isLoading} fallback={<TableCardSkeleton />}>
        <DashboardLowStock data={data?.lowStock ?? []} />
      </CardChartLoader>
    </>
  );
};

export default ReportsOverviewSection;
