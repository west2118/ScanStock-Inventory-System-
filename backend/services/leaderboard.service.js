import { branchPerformanceRankingQuery, productBestPerformanceRankingQuery } from "../utils/queries/leaderboard.queries.js";
import { employeePerformanceQuery } from "../utils/queries/productivity.queries.js";

export const getLeaderboardDataService = async (client) => {
    const [
        branchPerformanceRankingResult,
        employeePerformanceResult,
        productBestPerformanceRankingResult,
    ] = await Promise.all([
        client.query(branchPerformanceRankingQuery),
        client.query(employeePerformanceQuery),
        client.query(productBestPerformanceRankingQuery),
    ]);

    return {
        branchPerformanceRanking: branchPerformanceRankingResult.rows,
        employeePerformance: employeePerformanceResult.rows,
        productBestPerformanceRanking: productBestPerformanceRankingResult.rows,
    };
};
