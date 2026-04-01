// Reports.jsx - Reports & Analytics Page
import { useEffect, useState } from "react";
import {
  TrendingUp,
  Package,
  DollarSign,
  Download,
  Printer,
  RefreshCw,
  Activity,
  Filter,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { fetchData, formatNumber } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";
import SummaryStatCardList from "../components/SummaryStatCardList";
import ReportsOverviewSection from "../components/Reports/ReportsOverviewSection";
import ReportsInventorySection from "../components/Reports/ReportsInventorySection";
import ReportsSalesSection from "../components/Reports/ReportsSalesSection";
import ReportsPerformanceSection from "../components/Reports/ReportsPerformanceSection";
import SummaryStatCardListSkeleton from "../components/Skeletons/SummaryStatCardListSkeleton";

const Reports = () => {
  const [mode, setMode] = useState("monthly");
  const [appliedMode, setAppliedMode] = useState("monthly");

  const [reportType, setReportType] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [year, setYear] = useState("2026");

  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey:
      appliedMode === "range"
        ? ["reports-data", reportType, "range", startDate, endDate]
        : ["reports-data", reportType, appliedMode, year],

    queryFn: fetchData(
      appliedMode === "range"
        ? `http://localhost:5001/api/reports?mode=range&startDate=${startDate}&endDate=${endDate}&reportType=${reportType}`
        : `http://localhost:5001/api/reports?mode=${appliedMode}&year=${year}&reportType=${reportType}`,
    ),
  });

  useEffect(() => {
    if (mode !== "range") {
      setAppliedMode(mode);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "range" && startDate.trim() !== "" && endDate.trim() !== "") {
      setAppliedMode("range");
    }
  }, [mode, startDate, endDate]);

  const stats = data?.summaryStats;

  const summaryCards = [
    {
      title: "Total Revenue",
      value: formatNumber(Number(stats?.totalRevenue)) ?? 0,
      subtitle: `${Math.round(stats?.revenueChange) ?? 0}% metrics`,
      icon: DollarSign,
      iconColor: "text-green-600",
    },
    {
      title: "Stock In",
      value: stats?.stockIns ?? 0,
      subtitle: `${Math.round(stats?.stockInChange) ?? 0}% metrics`,
      icon: ArrowUp,
      iconColor: "text-blue-600",
    },
    {
      title: "Stock Out",
      value: stats?.stockOuts ?? 0,
      subtitle: `${Math.round(stats?.stockOutChange) ?? 0}% metrics`,
      icon: ArrowDown,
      iconColor: "text-orange-600",
    },
    {
      title: "Turnover Rate",
      value: `${stats?.turnover ?? 0}%`,
      subtitle: `${Math.round(stats?.turnoverChange) ?? 0}% metrics`,
      icon: TrendingUp,
      iconColor: "text-purple-600",
    },
  ];

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Reports & Analytics
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Comprehensive inventory performance analysis
            </p>
          </div>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "sales", label: "Sales & Revenue", icon: DollarSign },
            { id: "inventory", label: "Inventory", icon: Package },
            { id: "performance", label: "Performance", icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setReportType(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  reportType === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Filters */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="bg-transparent border-none text-sm focus:outline-none focus:ring-0"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Annually</option>
                  <option value="range">Custom Range</option>
                </select>
              </div>

              {mode === "range" && (
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-sm outline-none"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate} // ✅ prevents end < start
                    onChange={(e) => setEndDate(e.target.value)}
                    className="text-sm outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="sm:w-48 relative">
            <Filter
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Groceries">Groceries</option>
              <option value="Tools">Tools</option>
              <option value="Beauty">Beauty</option>
            </select>
          </div>
        </div>
      </div>

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

      {/* Overview Section */}
      {reportType === "overview" && (
        <ReportsOverviewSection data={data?.reportData} isLoading={isLoading} />
      )}

      {/* Sales & Revenue Section */}
      {reportType === "sales" && (
        <ReportsSalesSection data={data?.reportData} isLoading={isLoading} />
      )}

      {/* Inventory Section */}
      {reportType === "inventory" && (
        <ReportsInventorySection
          data={data?.reportData}
          isLoading={isLoading}
        />
      )}

      {/* Performance Section */}
      {reportType === "performance" && (
        <ReportsPerformanceSection
          data={data?.reportData}
          isLoading={isLoading}
        />
      )}
    </main>
  );
};

export default Reports;
