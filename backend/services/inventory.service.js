import {
    inventoryByCategoryQuery,
    inventoryLevelsByBranchQuery,
    inventorySummaryQuery,
    inventoryValueByBranchQuery,
    productInventoryStatusQuery,
    stockMovementsMonthlyQuery,
} from "../utils/queries/inventory.queries.js";


export const getInventoryDataService = async (client) => {
    const [
        inventorySummaryResult,
        inventoryLevelsByBranchResult,
        inventoryByCategoryResult,
        stockMovementsMonthlyResult,
        inventoryValueByBranchResult,
        productInventoryStatusResult,
    ] = await Promise.all([
        client.query(inventorySummaryQuery),
        client.query(inventoryLevelsByBranchQuery),
        client.query(inventoryByCategoryQuery),
        client.query(stockMovementsMonthlyQuery),
        client.query(inventoryValueByBranchQuery),
        client.query(productInventoryStatusQuery),
    ]);

    return {
        summaryStats: inventorySummaryResult.rows[0],
        inventoryLevelsByBranch: inventoryLevelsByBranchResult.rows,
        inventoryByCategory: inventoryByCategoryResult.rows,
        stockMovementsMonthly: stockMovementsMonthlyResult.rows,
        inventoryValueByBranch: inventoryValueByBranchResult.rows,
        productInventoryStatus: productInventoryStatusResult.rows,
    };
};
