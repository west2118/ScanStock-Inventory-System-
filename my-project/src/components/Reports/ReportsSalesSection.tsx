import React from "react";
import DashboardCard from "../UI/ChartCard";
import { TrendingUp } from "lucide-react";
import OneBarChartCard from "../Charts/OneBarChartCard";
import AreaChartCard from "../Charts/AreaChartCard";
import TopPerformingProductsTable from "./TopPerformingProductsTable";
import CardChartLoader from "../CardLoader";
import TableCardSkeleton from "../Skeletons/TableCardSkeleton";

type ReportsSalesSectionProps = {
  data: {
    revenueTrend: {
      date: string;
      label: string;
      value: number;
    }[];
    netChangeTrend: {
      date: string;
      label: string;
      value: number;
    }[];
    topPerformingProducts: {
      id: number;
      productName: string;
      revenue: number;
      sales: number;
      sku: string;
      stock: number;
      turnover: number;
    }[];
  };
  isLoading: boolean;
};

const ReportsSalesSection = ({ data, isLoading }: ReportsSalesSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CardChartLoader isLoading={isLoading}>
          <DashboardCard
            title="Revenue Trend"
            subtitle="Last 7 days"
            icon={TrendingUp}
          >
            <OneBarChartCard data={data?.revenueTrend ?? []} />
          </DashboardCard>
        </CardChartLoader>

        <CardChartLoader isLoading={isLoading}>
          <DashboardCard
            title="Daily Orders Trend"
            subtitle="Last 7 days"
            icon={TrendingUp}
          >
            <AreaChartCard data={data?.netChangeTrend ?? []} />
          </DashboardCard>
        </CardChartLoader>
      </div>

      <CardChartLoader
        isLoading={isLoading}
        fallback={<TableCardSkeleton count={6} />}
      >
        <TopPerformingProductsTable data={data?.topPerformingProducts ?? []} />
      </CardChartLoader>
    </>
  );
};

export default ReportsSalesSection;
