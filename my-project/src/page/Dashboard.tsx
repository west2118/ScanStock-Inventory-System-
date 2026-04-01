import {
  Package,
  ArrowDownUp,
  AlertTriangle,
  ShoppingCart,
  ScanLine,
  TrendingUp,
  Box,
  Laptop,
} from "lucide-react";
import { fetchData } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";
import DashboardLowStock from "../components/Dashboard/DashboardLowStock";
import DashboardRecentStock from "../components/Dashboard/DashboardRecentStock";
import SummaryStatCardList from "../components/SummaryStatCardList";
import BarChartCard from "../components/Charts/BarChartCard";
import DashboardCard from "../components/UI/ChartCard";
import LineChartCard from "../components/Charts/AreaChartCard";
import HorizontalBarChartCard from "../components/Charts/HorizontalBarChartCard";
import CategoryStockChartCard from "../components/Charts/CategoryStockChartCard";
import SummaryStatCardListSkeleton from "../components/Skeletons/SummaryStatCardListSkeleton";
import { ChartCardSkeleton } from "../components/Skeletons/ChartCardSkeleton";
import TableCardSkeleton from "../components/Skeletons/TableCardSkeleton";

type DashboardData = {
  summary: {
    availableStock: number;
    differenceChangeStockIn: number;
    differenceChangeStockOut: number;
    lowStocks: number;
    stockInToday: number;
    stockOutToday: number;
  };
  charts: {
    dateRange: string;
    weeklyStockMovement: {
      date: string;
      label: string;
      value1: number;
      value2: number;
    }[];
    stockCategory: {
      name: string;
      value1: number;
    }[];
    bestSellingProducts: {
      name: string;
      value: number;
    }[];
    netChange: {
      date: string;
      label: string;
      value: number;
    }[];
    lowStock: {
      id: number;
      sku: string;
      productName: string;
      stock: number;
      stockCritical: number;
      stockLow: number;
    }[];
    recentMovements: {
      id: number;
      createdAt: string;
      handledBy: string;
      productName: string;
      quantity: number;
      type: string;
    }[];
  };
};

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery<DashboardData>({
    queryKey: ["dashboard-data"],
    queryFn: fetchData(`http://localhost:5001/api/dashboard`),
  });

  const summaryCards = [
    {
      title: "Total Inventory",
      value: data?.summary.availableStock ?? 0,
      subtitle: "units in stock",
      icon: Package,
      iconColor: "text-blue-600",
    },
    {
      title: "Needs Attention",
      value: data?.summary.lowStocks ?? 0,
      subtitle: "items below minimum",
      icon: AlertTriangle,
      iconColor: "text-orange-500",
    },
    {
      title: "Stock In Today",
      value: `+${data?.summary.stockInToday ?? 0}`,
      subtitle: `${data?.summary.differenceChangeStockIn ?? 0} units`,
      icon: ShoppingCart,
      iconColor: "text-green-600",
    },
    {
      title: "Stock Out Today",
      value: `-${data?.summary.stockOutToday ?? 0}`,
      subtitle: `${data?.summary.differenceChangeStockOut ?? 0} units`,
      icon: ArrowDownUp,
      iconColor: "text-red-500",
    },
  ];

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SummaryStatCardListSkeleton key={index} />
            ))
          : summaryCards.map((summary) => (
              <SummaryStatCardList key={summary.title} summary={summary} />
            ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Stock Movement */}
        {isLoading ? (
          <ChartCardSkeleton />
        ) : (
          <DashboardCard
            title="Weekly Stock Movement"
            subtitle="Last 7 days"
            icon={TrendingUp}
          >
            <BarChartCard data={data?.charts.weeklyStockMovement ?? []} />
          </DashboardCard>
        )}

        {/* Stock by Category */}
        {isLoading ? (
          <ChartCardSkeleton />
        ) : (
          <DashboardCard
            title="Stock by Category"
            subtitle="Last 7 days"
            icon={Box}
          >
            <CategoryStockChartCard data={data?.charts.stockCategory ?? []} />
          </DashboardCard>
        )}
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Inventory Trend */}
        {isLoading ? (
          <ChartCardSkeleton />
        ) : (
          <DashboardCard
            title="Best Selling Products"
            subtitle="Last 7 days"
            icon={Laptop}
          >
            <HorizontalBarChartCard
              data={data?.charts.bestSellingProducts ?? []}
            />
          </DashboardCard>
        )}

        {/* Net Change Line Chart */}
        {isLoading ? (
          <ChartCardSkeleton />
        ) : (
          <DashboardCard
            title="Net Change"
            subtitle="Last 7 days"
            icon={TrendingUp}
          >
            <LineChartCard data={data?.charts.netChange ?? []} />
          </DashboardCard>
        )}
      </div>

      {/* Low Stock & Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Items */}
        {isLoading ? (
          <TableCardSkeleton />
        ) : (
          <DashboardLowStock data={data?.charts.lowStock ?? []} />
        )}

        {/* Recent Stock Movements */}
        {isLoading ? (
          <TableCardSkeleton />
        ) : (
          <DashboardRecentStock data={data?.charts.recentMovements ?? []} />
        )}
      </div>

      {/* Footer Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ScanLine size={12} />
              Barcode enabled
            </span>
            <span>Real-time tracking</span>
            <span>Auto-sync every 5min</span>
          </div>
          <div>
            <span>© 2024 ScanStock Inventory System</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
