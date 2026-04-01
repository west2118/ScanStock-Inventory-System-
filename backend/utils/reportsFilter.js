// utils/reportFilters.ts
export const buildDateFilter = (filters, column = "created_at") => {
  if (filters.dateRange === "week") {
    return `AND ${column} >= NOW() - INTERVAL '7 days'`;
  }

  if (filters.startDate && filters.endDate) {
    return `AND ${column} BETWEEN '${filters.startDate}' AND '${filters.endDate}'`;
  }

  return "";
};

export const buildCategoryFilter = (filters, column = "category") => {
  if (!filters.category || filters.category === "all") return "";

  return `AND ${column} = '${filters.category}'`;
};
