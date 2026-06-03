import pool from "../../config/db.js";

export const createBranch = async (req, res) => {
  const { branch_name, branch_code, location, status } = req.body;

  try {
    // Validation
    if (!branch_name || !branch_code || !location) {
      return res.status(400).json({
        success: false,
        message: "Branch name, branch code, and location are required",
      });
    }

    // Check if branch already exists
    const existingBranch = await pool.query(
      `SELECT * FROM branches 
       WHERE branch_name = $1 OR branch_code = $2`,
      [branch_name, branch_code],
    );

    if (existingBranch.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Branch name or branch code already exists",
      });
    }

    // Insert new branch
    const newBranch = await pool.query(
      `INSERT INTO branches 
        (branch_name, branch_code, location, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [branch_name, branch_code, location, status || "active"],
    );

    return res.status(201).json({
      success: true,
      message: "Branch created successfully",
      branch: newBranch.rows[0],
    });
  } catch (error) {
    console.error("Create branch error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
