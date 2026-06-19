import type { LucideIcon } from "lucide-react";

export type UserSummaryStatsType = {
  activeUsers: number;
  admins: number;
  branchManagers: number;
  cashiers: number;
  centralAdmins: number;
  inactiveUsers: number;
  inventoryStaff: number;
  totalUsers: number;
  unassigned: number;
};

export type UserType = {
  id: number;
  name: string;
  username: string;
  role: string;
  status: string;
  createdAt: string;
  email: string;
  branchId: number;
  branchName: string;
  branchCode: string;
  contact: string;
};

export type AuthContextType = {
  user: UserType | null;
  login: (formData: any) => Promise<UserType>;
  logout: () => Promise<void>;
  loading: any;
};

export type SummaryStatType = {
  title: string;
  value: number | string;
  subtitle: string;
  subtitleColor: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
};

export type BranchType = {
  id: number;
  branchCode: string;
  branchName: string;
  createdAt: string;
  location: string;
  manager: {
    id: number;
    name: string | null;
    email: string | null;
  } | null;
  region: string;
  status: "active" | "inactive";
  totalSales: number;
  totalInventory: number;
};

export type ChartData = {
  name: string;
  value: number;
};

export type EmployeeProductivity = {
  name: string;
  employees: number;
  salesPerEmployee: number;
  ticketsPerEmployee: number;
};

export type DashboardDataType = {
  summaryStats: {
    totalBranches: number;
    totalSales: number;
    totalStocks: number;
  };
  topPerforming: ChartData;
  needsImprovement: ChartData;
  monthlySalesOverview: ChartData[];
  branchPerformance: ChartData[];
  inventoryDistribution: ChartData[];
  employeeProductivityOverview: EmployeeProductivity[];
};

export type SalesDataType = {
  summaryStats: {
    totalSales: number;
    avgSalesPerBranch: number;
    bestPerformingBranch: {
      branchName: string;
      sales: number;
    };
    fastestGrowingBranch: {
      branchName: string;
      growthPercent: number;
    };
  };

  salesComparisonMonthly: {
    name: string;
    branches: {
      branch: string;
      sales: number;
    }[];
  }[];

  monthlySalesOverview: ChartData[];

  branchPerformance: ChartData[];

  marketShare: {
    name: string;
    sales: number;
    marketShare: string;
  }[];

  topSellingProductsByBranch: {
    product: string;
    branches: {
      branch: string;
      sold: number;
    }[];
  }[];
};

export type InventoryDataType = {
  summaryStats: {
    totalInventoryValue: number;
    totalStocks: number;
    lowStockCount: number;
    inventoryTurnover: number;
  };
  inventoryLevelsByBranch: ChartData;
  inventoryByCategory: {
    name: string;
    value: number;
    value2: number;
  }[];
  stockMovementsMonthly: {
    month: string;
    stockIn: number;
    stockOut: number;
  }[];
  inventoryValueByBranch: ChartData[];
  productInventoryStatus: {
    category: string;
    id: number;
    productName: string;
    sku: string;
    totalStock: number;
    branches: {
      branch: string;
      status: string;
      stock: number;
    }[];
  }[];
};

export type EmployeeProductivityDataType = {
  summaryStats: {
    avgProductivity: string;
    topPerformer: string;
    totalEmployees: number;
    totalSales: string;
  };
  productivityByBranch: ChartData[];
  productivityTrendsMonthly: {
    name: string;
    branches: {
      branch: string;
      productivity: number;
    }[];
  }[];
  topPerformersMonth: {
    id: number;
    branch: string;
    name: string;
    productivity: string;
    role: string;
    value: number;
  }[];
  needsImprovementMonth: {
    id: number;
    branch: string;
    name: string;
    productivity: string;
    role: string;
    value: number;
  }[];
  employeePerformance: {
    id: number;
    branchName: string;
    employeeName: string;
    productivity: string;
    role: string;
    totalSales: number;
    totalTickets: number;
  }[];
};

export type LeaderboardDataType = {
  branchPerformanceRanking: {
    avgTicket: string;
    branchCode: string;
    employeeCount: number;
    growth: number;
    name: string;
    productivity: string;
    rank: string;
    region: string;
    totalSales: number;
    totalTickets: number;
  }[];
  employeePerformance: {
    avgTicket: string;
    branchName: string;
    employeeName: string;
    id: number;
    productivity: string;
    rank: string;
    role: string;
    totalSales: number;
    totalTickets: number;
  }[];
  productBestPerformanceRanking: {
    growth: string;
    id: number;
    productName: string;
    rank: string;
    totalSales: number;
    totalUnitsSold: number;
    category: string;
  }[];
};

export type ProductType = {
  id: number;
  sku: string;
  barcode: string;
  slug?: string;
  productName: string;
  shortDescription?: string;
  description?: string;
  features?: string;
  price: number;
  category: string;
  categoryId?: number;
  location: string;
  status: string;
  vatType: string;
  createdAt: string;
  brand: string;
  brandId?: number;
  unitsSold: number;
  storeUnitsSold: number;
  onlineUnitsSold: number;
  totalRevenue: number;
  storeRevenue: number;
  onlineRevenue: number;
  images?: any[];
  specifications?: any[];
};

export type BrandType = {
  id: number;
  name: string;
  slug?: string;
  logoUrl?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryType = {
  id: number;
  name: string;
  slug?: string;
  parentId?: number;
  parentName?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
