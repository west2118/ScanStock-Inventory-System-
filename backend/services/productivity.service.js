import {
    employeePerformanceQuery,
    needsImprovementMonthQuery,
    productivityByBranchQuery,
    productivitySummaryQuery,
    productivityTrendsMonthlyQuery,
    topPerformersMonthQuery,
} from "../utils/queries/productivity.queries.js";



export const getProductivityDataService = async (client) => {
    const [
        productivitySummaryResult,
        productivityByBranchResult,
        productivityTrendsMonthlyResult,
        topPerformersMonthResult,
        needsImprovementMonthResult,
        employeePerformanceResult,
    ] = await Promise.all([
        client.query(productivitySummaryQuery),
        client.query(productivityByBranchQuery),
        client.query(productivityTrendsMonthlyQuery),
        client.query(topPerformersMonthQuery),
        client.query(needsImprovementMonthQuery),
        client.query(employeePerformanceQuery),
    ]);

    return {
        summaryStats: productivitySummaryResult.rows[0],
        productivityByBranch: productivityByBranchResult.rows,
        productivityTrendsMonthly: productivityTrendsMonthlyResult.rows,
        topPerformersMonth: topPerformersMonthResult.rows,
        needsImprovementMonth: needsImprovementMonthResult.rows,
        employeePerformance: employeePerformanceResult.rows,
    };
};
