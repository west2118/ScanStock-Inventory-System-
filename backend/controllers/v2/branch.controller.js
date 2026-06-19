import pool from "../../config/db.js";
import {
  createBranchService,
  getBranchOptionsService,
  getBranchesChartsService,
  getBranchesService,
  getBranchesSummaryStatsService,
} from "../../services/branch.service.js";
import { asyncHandler } from "../../utils/helper.js";

export const createBranch = asyncHandler(async (req, res) => {
  const branch = await createBranchService(req.validatedBody);

  return res.status(201).json({
    success: true,
    message: "Branch created successfully",
    data: branch,
  });
});

export const getBranches = asyncHandler(async (req, res) => {
  const branches = await getBranchesService(req.query);

  return res.status(200).json(branches);
});

export const getBranchById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const branch = await getBranchByIdService(id);

  if (!branch) {
    return res.status(404).json({
      success: false,
      message: "Branch not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: branch,
  });
});

export const updateBranch = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingBranch = await getBranchByIdService(id);

  if (!existingBranch) {
    return res.status(404).json({
      success: false,
      message: "Branch not found",
    });
  }

  const updatedBranch = await updateBranchService(id, req.validatedBody);

  return res.status(200).json({
    success: true,
    message: "Branch updated successfully",
    data: updatedBranch,
  });
});

export const deleteBranch = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedBranch = await deleteBranchService(id);

  if (!deletedBranch) {
    return res.status(404).json({
      success: false,
      message: "Branch not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Branch deleted successfully",
  });
});

// ----------- FIXING THE BOTTOM ------------------

export const getBranchesSummaryStats = async (req, res) => {
  try {
    const summaryStats = await getBranchesSummaryStatsService();

    return res.status(200).json(summaryStats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch branches",
    });
  }
};

export const getBranchesCharts = async (req, res) => {
  const client = await pool.connect();

  try {
    const charts = await getBranchesChartsService(client);

    return res.status(200).json(charts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch branches",
    });
  } finally {
    client.release();
  }
};

export const getBranchOptions = async (req, res) => {
  try {
    const branches = await getBranchOptionsService();

    return res.status(200).json(branches);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch branches",
    });
  }
};
