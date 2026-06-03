import React, { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Store,
  TrendingUp,
  Package,
  Users,
  Trophy,
  FileText,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Printer,
  Calendar,
  DollarSign,
  Boxes,
  UserCheck,
  BarChart3,
  Activity,
  Clock,
  TrendingUp as TrendingUpIcon,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Star,
  Crown,
  FileSpreadsheet,
  FileJson,
  FileImage,
  Loader2,
  Send,
  Mail,
  Share2,
  BookOpen,
  ChartLine,
  Target,
  Award,
  Zap,
  Percent,
  Layers,
  Building2,
  GitBranch,
  TrendingDown,
  Crosshair,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  Treemap,
} from "recharts";

const CompanyPerformanceReportsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("reports");
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState("monthly");
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  // Sales Data for Reports
  const salesData = {
    monthlySales: [
      { month: "Jan", revenue: 1850000, target: 1750000, growth: 5.7 },
      { month: "Feb", revenue: 1980000, target: 1850000, growth: 7.0 },
      { month: "Mar", revenue: 2100000, target: 2000000, growth: 5.0 },
      { month: "Apr", revenue: 2250000, target: 2100000, growth: 7.1 },
      { month: "May", revenue: 2420000, target: 2250000, growth: 7.6 },
      { month: "Jun", revenue: 2580000, target: 2400000, growth: 7.5 },
      { month: "Jul", revenue: 2750000, target: 2600000, growth: 5.8 },
      { month: "Aug", revenue: 2910000, target: 2750000, growth: 5.8 },
      { month: "Sep", revenue: 3080000, target: 2900000, growth: 6.2 },
      { month: "Oct", revenue: 3250000, target: 3100000, growth: 4.8 },
      { month: "Nov", revenue: 3400000, target: 3250000, growth: 4.6 },
      { month: "Dec", revenue: 3600000, target: 3400000, growth: 5.9 },
    ],
    branchSales: [
      {
        branch: "Manila Central",
        revenue: 4250000,
        percentage: 16.9,
        growth: 18.5,
      },
      {
        branch: "Quezon City",
        revenue: 3850000,
        percentage: 15.3,
        growth: 12.8,
      },
      { branch: "Makati", revenue: 3980000, percentage: 15.8, growth: 15.2 },
      { branch: "Taguig", revenue: 3620000, percentage: 14.4, growth: 14.2 },
      { branch: "Pasig", revenue: 3350000, percentage: 13.3, growth: 9.5 },
      { branch: "Cebu City", revenue: 3120000, percentage: 12.4, growth: 11.2 },
      { branch: "Davao", revenue: 2850000, percentage: 11.3, growth: 8.5 },
      { branch: "Cebu South", revenue: 2450000, percentage: 9.7, growth: 5.2 },
    ],
    categorySales: [
      {
        category: "Graphics Cards",
        revenue: 6580000,
        percentage: 26.1,
        growth: 32,
      },
      {
        category: "Processors",
        revenue: 5420000,
        percentage: 21.5,
        growth: 28,
      },
      {
        category: "Memory (RAM)",
        revenue: 3850000,
        percentage: 15.3,
        growth: 42,
      },
      { category: "Storage", revenue: 3650000, percentage: 14.5, growth: 38 },
      {
        category: "Motherboards",
        revenue: 2980000,
        percentage: 11.8,
        growth: 22,
      },
      {
        category: "Power Supplies",
        revenue: 1850000,
        percentage: 7.3,
        growth: 15,
      },
      { category: "Cases", revenue: 950000, percentage: 3.8, growth: 18 },
      {
        category: "Cooling Systems",
        revenue: 820000,
        percentage: 3.3,
        growth: 12,
      },
    ],
  };

  // Inventory Data
  const inventoryData = {
    totalStock: 15840,
    totalValue: 55800000,
    lowStockItems: 12,
    outOfStockItems: 3,
    turnoverRate: 3.8,
    categoryBreakdown: [
      {
        category: "Processors",
        stock: 2450,
        value: 78400000,
        turnover: 4.2,
        growth: 12,
      },
      {
        category: "Graphics Cards",
        stock: 1850,
        value: 129500000,
        turnover: 3.8,
        growth: 25,
      },
      {
        category: "Motherboards",
        stock: 2120,
        value: 42400000,
        turnover: 3.9,
        growth: 8,
      },
      {
        category: "Memory (RAM)",
        stock: 3200,
        value: 25600000,
        turnover: 4.5,
        growth: 35,
      },
      {
        category: "Storage",
        stock: 2950,
        value: 35400000,
        turnover: 4.1,
        growth: 28,
      },
      {
        category: "Power Supplies",
        stock: 1650,
        value: 24750000,
        turnover: 3.2,
        growth: 5,
      },
      {
        category: "Cases",
        stock: 1200,
        value: 12000000,
        turnover: 3.5,
        growth: 10,
      },
      {
        category: "Cooling Systems",
        stock: 850,
        value: 12750000,
        turnover: 3.0,
        growth: 8,
      },
    ],
    monthlyMovement: [
      { month: "Jun", received: 2450, sold: 2120, returned: 85 },
      { month: "Jul", received: 2680, sold: 2350, returned: 92 },
      { month: "Aug", received: 2820, sold: 2480, returned: 78 },
      { month: "Sep", received: 2950, sold: 2620, returned: 95 },
      { month: "Oct", received: 3120, sold: 2850, returned: 88 },
      { month: "Nov", received: 3280, sold: 2980, returned: 102 },
    ],
  };

  // Productivity Data
  const productivityData = {
    overallProductivity: 84.7,
    employeeCount: 128,
    avgSalesPerEmployee: 315625,
    avgTicketsPerEmployee: 218,
    satisfactionScore: 4.5,
    branchProductivity: [
      {
        branch: "Manila Central",
        productivity: 94,
        salesPerEmp: 151178,
        ticketsPerEmp: 245,
        satisfaction: 4.8,
      },
      {
        branch: "Makati",
        productivity: 92,
        salesPerEmp: 165833,
        ticketsPerEmp: 242,
        satisfaction: 4.7,
      },
      {
        branch: "Quezon City",
        productivity: 89,
        salesPerEmp: 148077,
        ticketsPerEmp: 228,
        satisfaction: 4.6,
      },
      {
        branch: "Taguig",
        productivity: 88,
        salesPerEmp: 164545,
        ticketsPerEmp: 225,
        satisfaction: 4.5,
      },
      {
        branch: "Cebu City",
        productivity: 86,
        salesPerEmp: 156000,
        ticketsPerEmp: 218,
        satisfaction: 4.5,
      },
      {
        branch: "Pasig",
        productivity: 84,
        salesPerEmp: 167500,
        ticketsPerEmp: 215,
        satisfaction: 4.4,
      },
      {
        branch: "Davao",
        productivity: 82,
        salesPerEmp: 158333,
        ticketsPerEmp: 208,
        satisfaction: 4.3,
      },
      {
        branch: "Cebu South",
        productivity: 72,
        salesPerEmp: 153125,
        ticketsPerEmp: 195,
        satisfaction: 3.9,
      },
    ],
    monthlyTrend: [
      {
        month: "Jun",
        productivity: 81,
        salesPerEmp: 298000,
        ticketsPerEmp: 205,
      },
      {
        month: "Jul",
        productivity: 82,
        salesPerEmp: 305000,
        ticketsPerEmp: 210,
      },
      {
        month: "Aug",
        productivity: 83,
        salesPerEmp: 312000,
        ticketsPerEmp: 215,
      },
      {
        month: "Sep",
        productivity: 84,
        salesPerEmp: 318000,
        ticketsPerEmp: 218,
      },
      {
        month: "Oct",
        productivity: 85,
        salesPerEmp: 325000,
        ticketsPerEmp: 222,
      },
      {
        month: "Nov",
        productivity: 86,
        salesPerEmp: 332000,
        ticketsPerEmp: 225,
      },
    ],
  };

  // NEW CHART 1: Sales vs Productivity Correlation Data
  const salesProductivityCorrelation = [
    {
      branch: "Manila Central",
      sales: 4.25,
      productivity: 94,
      satisfaction: 4.8,
      employees: 28,
    },
    {
      branch: "Makati",
      sales: 3.98,
      productivity: 92,
      satisfaction: 4.7,
      employees: 24,
    },
    {
      branch: "Quezon City",
      sales: 3.85,
      productivity: 89,
      satisfaction: 4.6,
      employees: 26,
    },
    {
      branch: "Taguig",
      sales: 3.62,
      productivity: 88,
      satisfaction: 4.5,
      employees: 22,
    },
    {
      branch: "Pasig",
      sales: 3.35,
      productivity: 84,
      satisfaction: 4.4,
      employees: 20,
    },
    {
      branch: "Cebu City",
      sales: 3.12,
      productivity: 86,
      satisfaction: 4.5,
      employees: 20,
    },
    {
      branch: "Davao",
      sales: 2.85,
      productivity: 82,
      satisfaction: 4.3,
      employees: 18,
    },
    {
      branch: "Cebu South",
      sales: 2.45,
      productivity: 72,
      satisfaction: 3.9,
      employees: 16,
    },
  ];

  // NEW CHART 2: Inventory Turnover by Category
  const inventoryTurnoverData = [
    { category: "Memory (RAM)", turnover: 4.5, stockValue: 25.6, trend: "up" },
    { category: "Processors", turnover: 4.2, stockValue: 78.4, trend: "up" },
    { category: "Storage", turnover: 4.1, stockValue: 35.4, trend: "up" },
    {
      category: "Motherboards",
      turnover: 3.9,
      stockValue: 42.4,
      trend: "stable",
    },
    {
      category: "Graphics Cards",
      turnover: 3.8,
      stockValue: 129.5,
      trend: "down",
    },
    { category: "Cases", turnover: 3.5, stockValue: 12.0, trend: "stable" },
    {
      category: "Power Supplies",
      turnover: 3.2,
      stockValue: 24.8,
      trend: "down",
    },
    {
      category: "Cooling Systems",
      turnover: 3.0,
      stockValue: 12.8,
      trend: "down",
    },
  ];

  // NEW CHART 3: Branch Performance Trends (Last 6 months)
  const branchPerformanceTrends = [
    { month: "Jun", manila: 88, makati: 86, quezon: 82, cebu: 79, davao: 75 },
    { month: "Jul", manila: 90, makati: 87, quezon: 83, cebu: 80, davao: 76 },
    { month: "Aug", manila: 91, makati: 88, quezon: 84, cebu: 81, davao: 77 },
    { month: "Sep", manila: 92, makati: 89, quezon: 85, cebu: 82, davao: 78 },
    { month: "Oct", manila: 93, makati: 90, quezon: 86, cebu: 83, davao: 79 },
    { month: "Nov", manila: 94, makati: 92, quezon: 89, cebu: 86, davao: 82 },
  ];

  // KPI Summary Data
  const kpiSummary = {
    totalRevenue: 25200000,
    revenueGrowth: 12.5,
    totalBranches: 8,
    activeBranches: 7,
    totalEmployees: 128,
    avgProductivity: 84.7,
    inventoryValue: 55800000,
    inventoryTurnover: 3.8,
    customerSatisfaction: 4.5,
    topProduct: "NVIDIA RTX 4090",
    topBranch: "Manila Central",
    topEmployee: "John Reyes",
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "branches", label: "Branches", icon: Store },
    { id: "sales", label: "Sales Analytics", icon: TrendingUp },
    { id: "inventory", label: "Inventory Analytics", icon: Package },
    { id: "productivity", label: "Employee Productivity", icon: Users },
    { id: "leaderboards", label: "Leaderboards", icon: Trophy },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-72 flex-shrink-0`}
    >
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BranchPulse</h1>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedReport({
        id: Date.now(),
        type: reportType,
        dateRange: dateRange,
        generatedAt: new Date().toLocaleString(),
        data: {
          sales: salesData,
          inventory: inventoryData,
          productivity: productivityData,
          kpi: kpiSummary,
          correlations: salesProductivityCorrelation,
          turnover: inventoryTurnoverData,
          trends: branchPerformanceTrends,
        },
      });
      setIsGenerating(false);
      setShowExportModal(true);
    }, 2000);
  };

  const ReportPreview = () => (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="text-center border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          BranchPulse Performance Report
        </h2>
        <p className="text-slate-500">
          Generated on {new Date().toLocaleDateString()} | Period:{" "}
          {dateRange.toUpperCase()}
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
          <DollarSign className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
            ₱{(kpiSummary.totalRevenue / 1000000).toFixed(1)}M
          </p>
          <p className="text-xs text-slate-500">Total Revenue</p>
          <span className="text-xs text-green-600">
            ↑ {kpiSummary.revenueGrowth}%
          </span>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
          <Building2 className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-green-700 dark:text-green-300">
            {kpiSummary.totalBranches}
          </p>
          <p className="text-xs text-slate-500">Active Branches</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
          <Users className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
            {kpiSummary.totalEmployees}
          </p>
          <p className="text-xs text-slate-500">Total Employees</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 text-center">
          <Target className="w-5 h-5 text-orange-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-orange-700 dark:text-orange-300">
            {kpiSummary.avgProductivity}%
          </p>
          <p className="text-xs text-slate-500">Avg Productivity</p>
        </div>
      </div>

      {/* Sales Section */}
      {reportType === "sales" || reportType === "all" ? (
        <div className="border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
            <TrendingUpIcon className="w-5 h-5 text-blue-600" /> Sales
            Performance
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `₱${v / 1000000}M`} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#10b981"
                  strokeDasharray="5 5"
                  name="Target"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700/30 rounded">
              <span>Best Month:</span>
              <span className="font-semibold">December (₱3.6M)</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700/30 rounded">
              <span>Average Monthly:</span>
              <span className="font-semibold">₱2.52M</span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Inventory Section */}
      {reportType === "inventory" || reportType === "all" ? (
        <div className="border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600" /> Inventory Status
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="text-center p-2 bg-slate-50 dark:bg-slate-700/30 rounded">
              <p className="text-xl font-bold">
                {inventoryData.totalStock.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">Total Units</p>
            </div>
            <div className="text-center p-2 bg-slate-50 dark:bg-slate-700/30 rounded">
              <p className="text-xl font-bold">
                ₱{(inventoryData.totalValue / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-slate-500">Total Value</p>
            </div>
            <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <p className="text-xl font-bold text-yellow-600">
                {inventoryData.lowStockItems}
              </p>
              <p className="text-xs text-slate-500">Low Stock Items</p>
            </div>
            <div className="text-center p-2 bg-slate-50 dark:bg-slate-700/30 rounded">
              <p className="text-xl font-bold">{inventoryData.turnoverRate}x</p>
              <p className="text-xs text-slate-500">Turnover Rate</p>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData.categoryBreakdown.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={11}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#10b981" name="Stock Units" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}

      {/* Productivity Section */}
      {reportType === "productivity" || reportType === "all" ? (
        <div className="border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-600" /> Employee
            Productivity
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 bg-slate-50 dark:bg-slate-700/30 rounded">
              <p className="text-xl font-bold">
                {productivityData.overallProductivity}%
              </p>
              <p className="text-xs text-slate-500">Overall Productivity</p>
            </div>
            <div className="text-center p-2 bg-slate-50 dark:bg-slate-700/30 rounded">
              <p className="text-xl font-bold">
                ₱{(productivityData.avgSalesPerEmployee / 1000).toFixed(0)}k
              </p>
              <p className="text-xs text-slate-500">Sales per Employee</p>
            </div>
            <div className="text-center p-2 bg-slate-50 dark:bg-slate-700/30 rounded">
              <p className="text-xl font-bold">
                {productivityData.satisfactionScore}
              </p>
              <p className="text-xs text-slate-500">Customer Satisfaction</p>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivityData.branchProductivity.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="branch"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={11}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar
                  dataKey="productivity"
                  fill="#8b5cf6"
                  name="Productivity %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}

      {/* NEW CHART 1: Sales vs Productivity Correlation (Scatter Plot) */}
      {(reportType === "sales" ||
        reportType === "productivity" ||
        reportType === "all") && (
        <div className="border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-indigo-600" /> Sales vs
            Productivity Correlation
          </h3>
          <p className="text-sm text-slate-500 mb-3">
            Shows relationship between sales revenue and employee productivity
            across branches
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="sales"
                  name="Sales"
                  unit="M"
                  label={{ value: "Sales (₱M)", position: "bottom", offset: 0 }}
                  domain={[2, 5]}
                  tickFormatter={(v) => `₱${v}M`}
                />
                <YAxis
                  type="number"
                  dataKey="productivity"
                  name="Productivity"
                  unit="%"
                  label={{
                    value: "Productivity (%)",
                    angle: -90,
                    position: "left",
                  }}
                  domain={[70, 100]}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "Sales") return [`₱${value}M`, "Sales"];
                    if (name === "Productivity")
                      return [`${value}%`, "Productivity"];
                    return [value, name];
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border">
                          <p className="font-semibold">{data.branch}</p>
                          <p className="text-sm">Sales: ₱{data.sales}M</p>
                          <p className="text-sm">
                            Productivity: {data.productivity}%
                          </p>
                          <p className="text-sm">
                            Satisfaction: {data.satisfaction}/5
                          </p>
                          <p className="text-sm">Employees: {data.employees}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter
                  name="Branches"
                  data={salesProductivityCorrelation}
                  fill="#6366f1"
                  shape="circle"
                >
                  {salesProductivityCorrelation.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.productivity >= 90
                          ? "#10b981"
                          : entry.productivity >= 80
                            ? "#3b82f6"
                            : "#f59e0b"
                      }
                      r={entry.satisfaction * 6}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>High (90%+)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Good (80-89%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Average (70-79%)</span>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <div className="w-4 h-4 rounded-full border-2 border-indigo-500"></div>
              <span>Circle size = Satisfaction</span>
            </div>
          </div>
        </div>
      )}

      {/* NEW CHART 2: Inventory Turnover by Category (Bar Chart with Trend Indicators) */}
      {(reportType === "inventory" || reportType === "all") && (
        <div className="border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" /> Inventory Turnover
            by Category
          </h3>
          <p className="text-sm text-slate-500 mb-3">
            Measures how quickly inventory is sold - higher turnover indicates
            better efficiency
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={inventoryTurnoverData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  domain={[0, 5]}
                  label={{ value: "Turnover Rate (x)", position: "bottom" }}
                />
                <YAxis type="category" dataKey="category" width={100} />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "turnover")
                      return [`${value}x`, "Turnover Rate"];
                    if (name === "stockValue")
                      return [`₱${value}M`, "Stock Value"];
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar
                  dataKey="turnover"
                  fill="#10b981"
                  name="Turnover Rate (x)"
                  barSize={20}
                  radius={[0, 4, 4, 0]}
                >
                  {inventoryTurnoverData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.trend === "up"
                          ? "#10b981"
                          : entry.trend === "down"
                            ? "#ef4444"
                            : "#f59e0b"
                      }
                    />
                  ))}
                </Bar>
                <Line
                  type="monotone"
                  dataKey="stockValue"
                  stroke="#6366f1"
                  name="Stock Value (₱M)"
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <span className="text-green-600">↑</span> Improving Turnover
            </div>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <span className="text-yellow-600">→</span> Stable Turnover
            </div>
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
              <span className="text-red-600">↓</span> Declining Turnover
            </div>
          </div>
        </div>
      )}

      {/* NEW CHART 3: Branch Performance Trends (Last 6 months - Line Chart) */}
      {(reportType === "sales" ||
        reportType === "productivity" ||
        reportType === "all") && (
        <div className="border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-600" /> Branch Performance
            Trends (Last 6 Months)
          </h3>
          <p className="text-sm text-slate-500 mb-3">
            Productivity trend comparison across top 5 branches
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={branchPerformanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                  domain={[70, 100]}
                  label={{
                    value: "Productivity (%)",
                    angle: -90,
                    position: "left",
                  }}
                />
                <Tooltip formatter={(value) => [`${value}%`, "Productivity"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="manila"
                  stroke="#3b82f6"
                  name="Manila Central"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="makati"
                  stroke="#10b981"
                  name="Makati"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="quezon"
                  stroke="#f59e0b"
                  name="Quezon City"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="cebu"
                  stroke="#ec4899"
                  name="Cebu City"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="davao"
                  stroke="#8b5cf6"
                  name="Davao"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="font-semibold text-blue-600">Manila Central</p>
              <p>↑ +6.8%</p>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <p className="font-semibold text-green-600">Makati</p>
              <p>↑ +7.0%</p>
            </div>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <p className="font-semibold text-yellow-600">Quezon City</p>
              <p>↑ +8.5%</p>
            </div>
            <div className="p-2 bg-pink-50 dark:bg-pink-900/20 rounded">
              <p className="font-semibold text-pink-600">Cebu City</p>
              <p>↑ +8.9%</p>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
              <p className="font-semibold text-purple-600">Davao</p>
              <p>↑ +9.3%</p>
            </div>
          </div>
        </div>
      )}

      {/* Branch Summary Table */}
      {reportType === "all" ? (
        <div className="border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-600" /> Branch Performance
            Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="text-left p-2">Branch</th>
                  <th className="text-right p-2">Revenue</th>
                  <th className="text-center p-2">Productivity</th>
                  <th className="text-center p-2">Satisfaction</th>
                  <th className="text-center p-2">Growth</th>
                </tr>
              </thead>
              <tbody>
                {salesData.branchSales.map((branch, idx) => {
                  const productivity = productivityData.branchProductivity.find(
                    (b) => b.branch === branch.branch,
                  );
                  return (
                    <tr key={idx} className="border-t">
                      <td className="p-2 font-medium">{branch.branch}</td>
                      <td className="p-2 text-right">
                        ₱{(branch.revenue / 1000000).toFixed(1)}M
                      </td>
                      <td className="p-2 text-center">
                        {productivity?.productivity || "-"}%
                      </td>
                      <td className="p-2 text-center">
                        {productivity?.satisfaction || "-"}
                      </td>
                      <td className="p-2 text-center text-green-600">
                        ↑ {branch.growth}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* Footer */}
      <div className="text-center text-xs text-slate-400 border-t pt-4">
        <p>BranchPulse Analytics System - Confidential Report</p>
        <p>
          This report is automatically generated and contains proprietary
          information.
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
      {/* Report Type Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Report Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setReportType("sales")}
                className={`p-3 rounded-xl border-2 transition-all ${
                  reportType === "sales"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-blue-300"
                }`}
              >
                <DollarSign className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Sales Report</span>
              </button>
              <button
                onClick={() => setReportType("inventory")}
                className={`p-3 rounded-xl border-2 transition-all ${
                  reportType === "inventory"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600 hover:border-green-300"
                }`}
              >
                <Package className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Inventory Report</span>
              </button>
              <button
                onClick={() => setReportType("productivity")}
                className={`p-3 rounded-xl border-2 transition-all ${
                  reportType === "productivity"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 text-gray-600 hover:border-purple-300"
                }`}
              >
                <Users className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Productivity Report</span>
              </button>
              <button
                onClick={() => setReportType("all")}
                className={`p-3 rounded-xl border-2 transition-all ${
                  reportType === "all"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 text-gray-600 hover:border-orange-300"
                }`}
              >
                <Layers className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Full Report</span>
              </button>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none flex-1 cursor-pointer"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFormat("pdf")}
                className={`flex-1 p-2 rounded-lg border transition-all ${
                  selectedFormat === "pdf"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 text-gray-600 hover:border-red-300"
                }`}
              >
                <FileText className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">PDF</span>
              </button>
              <button
                onClick={() => setSelectedFormat("excel")}
                className={`flex-1 p-2 rounded-lg border transition-all ${
                  selectedFormat === "excel"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600 hover:border-green-300"
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">Excel</span>
              </button>
              <button
                onClick={() => setSelectedFormat("csv")}
                className={`flex-1 p-2 rounded-lg border transition-all ${
                  selectedFormat === "csv"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-blue-300"
                }`}
              >
                <FileJson className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-70"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-2xl p-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-100">Total Revenue (YTD)</p>
              <p className="text-2xl font-bold">
                ₱{(kpiSummary.totalRevenue / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-blue-100">
                ↑ {kpiSummary.revenueGrowth}% vs last year
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-2xl p-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-green-100">Inventory Value</p>
              <p className="text-2xl font-bold">
                ₱{(kpiSummary.inventoryValue / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-green-100">
                Turnover: {kpiSummary.inventoryTurnover}x
              </p>
            </div>
            <Package className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-400 rounded-2xl p-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-purple-100">Avg Productivity</p>
              <p className="text-2xl font-bold">
                {kpiSummary.avgProductivity}%
              </p>
              <p className="text-xs text-purple-100">
                {kpiSummary.totalEmployees} employees
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-orange-100">Customer Satisfaction</p>
              <p className="text-2xl font-bold">
                {kpiSummary.customerSatisfaction}
              </p>
              <p className="text-xs text-orange-100">out of 5.0</p>
            </div>
            <Star className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Report Preview Section */}
      {(reportType === "sales" ||
        reportType === "inventory" ||
        reportType === "productivity" ||
        reportType === "all") && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Report Preview
            </h3>
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Printer className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Mail className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-6 max-h-[800px] overflow-y-auto">
            <ReportPreview />
          </div>
          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={handleGenerateReport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && generatedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Export Report</h3>
              <p className="text-sm text-gray-500 mt-1">
                Your report has been generated successfully
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="font-semibold text-green-700">Report Ready</p>
                <p className="text-sm text-gray-500">
                  Generated on {generatedReport.generatedAt}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filename
                </label>
                <input
                  type="text"
                  defaultValue={`branchpulse_${reportType}_report_${new Date().toISOString().split("T")[0]}`}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <div className="flex gap-2">
                  <button
                    className={`flex-1 p-2 rounded-lg border ${selectedFormat === "pdf" ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                  >
                    <FileText className="w-4 h-4 mx-auto" />
                    <span className="text-xs">PDF</span>
                  </button>
                  <button
                    className={`flex-1 p-2 rounded-lg border ${selectedFormat === "excel" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                  >
                    <FileSpreadsheet className="w-4 h-4 mx-auto" />
                    <span className="text-xs">Excel</span>
                  </button>
                  <button
                    className={`flex-1 p-2 rounded-lg border ${selectedFormat === "csv" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  >
                    <FileJson className="w-4 h-4 mx-auto" />
                    <span className="text-xs">CSV</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Schedule Automated Report
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Set up recurring report generation
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Daily</option>
                  <option>Weekly (Monday)</option>
                  <option>Monthly (1st day)</option>
                  <option>Quarterly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipients (Email)
                </label>
                <input
                  type="email"
                  placeholder="admin@branchpulse.com, manager@branchpulse.com"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sales Summary</option>
                  <option>Inventory Status</option>
                  <option>Productivity Report</option>
                  <option>Full Performance Report</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPerformanceReportsPage;
