import pool from "../config/db.js";
import {
  CATEGORY_PERFORMANCE_QUERY,
  getTimeSeriesQuery,
  INVENTORY_METRICS_QUERY,
  LOW_STOCK_QUERY,
  STOCK_CATEGORY_QUERY,
  SUMMARY_STATS_QUERY,
  TOP_PERFORMING_PRODUCTS_QUERY,
} from "../utils/queries.js";

export const getReportsService = async (
  mode,
  year,
  startDate,
  endDate,
  reportType,
) => {
  const params = [mode, year || "2026", startDate, endDate];

  let reportData;

  switch (reportType.toLowerCase()) {
    case "overview":
      reportData = await getOverviewReportService(params);
      break;

    case "sales":
      reportData = await getSalesReportService(params);
      break;

    case "inventory":
      reportData = await getInventoryReportService(params);
      break;

    case "performance":
      reportData = await getPerformanceReportService(params);
      break;

    case "forecast":
      reportData = await getForecastReport(params);
      break;

    default:
      throw new Error("Invalid report type");
  }

  const summaryStats = await pool.query(SUMMARY_STATS_QUERY, params);

  return {
    summaryStats: summaryStats.rows[0],
    reportData,
  };
};

export const getOverviewReportService = async (params) => {
  const client = await pool.connect();

  try {
    const [revenueTrend, stockMovements, categoryPerformance, lowStock] =
      await Promise.all([
        client.query(getTimeSeriesQuery("revenue"), params),
        client.query(getTimeSeriesQuery("stocks"), params),
        client.query(CATEGORY_PERFORMANCE_QUERY, params),
        client.query(LOW_STOCK_QUERY),
      ]);

    return {
      revenueTrend: revenueTrend.rows,
      stockMovements: stockMovements.rows,
      categoryPerformance: categoryPerformance.rows,
      lowStock: lowStock.rows,
    };
  } finally {
    client.release();
  }
};

export const getSalesReportService = async (params) => {
  const client = await pool.connect();

  try {
    const [revenueTrend, netChangeTrend, topPerformingProducts] =
      await Promise.all([
        client.query(getTimeSeriesQuery("revenue"), params),
        client.query(getTimeSeriesQuery("netChange"), params),
        client.query(TOP_PERFORMING_PRODUCTS_QUERY, params),
      ]);

    return {
      revenueTrend: revenueTrend.rows,
      netChangeTrend: netChangeTrend.rows,
      topPerformingProducts: topPerformingProducts.rows,
    };
  } finally {
    client.release();
  }
};

export const getInventoryReportService = async (params) => {
  const client = await pool.connect();

  try {
    const [categoryPerformance, stockCategory, inventoryMetrics] =
      await Promise.all([
        client.query(CATEGORY_PERFORMANCE_QUERY, params),
        client.query(STOCK_CATEGORY_QUERY),
        client.query(INVENTORY_METRICS_QUERY, params),
      ]);

    return {
      categoryPerformance: categoryPerformance.rows,
      stockCategory: stockCategory.rows,
      inventoryMetrics: inventoryMetrics.rows,
    };
  } finally {
    client.release();
  }
};

export const getPerformanceReportService = async (params) => {
  const client = await pool.connect();

  try {
    const performanceMetrics = await client.query(
      getTimeSeriesQuery("performance"),
      params,
    );

    return {
      performanceMetrics: performanceMetrics.rows,
    };
  } finally {
    client.release();
  }
};
