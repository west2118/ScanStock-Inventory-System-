import React from "react";
import DashboardCard from "../UI/ChartCard";
import CategoryStockChartCard from "../Charts/CategoryStockChartCard";
import { TrendingUp } from "lucide-react";
import InventoryProductsHealth from "./InventoryProductsHealth";
import OneBarChartCard from "../Charts/OneBarChartCard";
import CardChartLoader from "../CardLoader";
import TableCardSkeleton from "../Skeletons/TableCardSkeleton";

type ReportsInventorySectionProps = {
  data: {
    categoryPerformance: {
      name: string;
      value1: number;
      value2: number;
    }[];
    stockCategory: {
      label: string;
      value: number;
    }[];
    inventoryMetrics: {
      productName: string;
      sales: number;
      stock: number;
      stockValue: number;
      turnover: number;
    }[];
  };
  isLoading: boolean;
};

const ReportsInventorySection = ({
  data,
  isLoading,
}: ReportsInventorySectionProps) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CardChartLoader isLoading={isLoading}>
          <DashboardCard
            title="Inventory Value by Category"
            subtitle="Last 7 days"
            icon={TrendingUp}
          >
            <CategoryStockChartCard data={data?.categoryPerformance ?? []} />
          </DashboardCard>
        </CardChartLoader>

        <CardChartLoader isLoading={isLoading}>
          <DashboardCard
            title="Stock Turnover Rate"
            subtitle="Last 7 days"
            icon={TrendingUp}
          >
            <OneBarChartCard data={data?.stockCategory ?? []} />
          </DashboardCard>
        </CardChartLoader>
      </div>

      <CardChartLoader isLoading={isLoading} fallback={<TableCardSkeleton />}>
        <InventoryProductsHealth data={data?.inventoryMetrics ?? []} />
      </CardChartLoader>
    </>
  );
};

export default ReportsInventorySection;
