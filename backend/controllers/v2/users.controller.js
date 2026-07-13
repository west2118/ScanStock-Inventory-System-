import {
    createUserService,
    deleteUserService,
    disabledUserService,
    getUsersService,
    getUsersSummaryStatsService,
    updateUserService,
} from "../../services/users.service.js";
import pool from "../../config/db.js";

export const getUsers = async (req, res) => {
    const client = await pool.connect();

    try {
        const { page, limit, search, status, role, branchId } = req.query;

        const users = await getUsersService(client, {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            search,
            status,
            role,
            branchId,
        });

        return res.status(200).json(users);
    } catch (error) {
        console.error("Get Users Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    } finally {
        client.release();
    }
};

export const getUsersSummaryStats = async (req, res) => {
    try {
        const summaryStats = await getUsersSummaryStatsService();

        return res.status(200).json(summaryStats);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user summary statistics",
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await createUserService(req.body);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await updateUserService({
            id: req.params.id,
            ...req.body,
        });

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const disabledUser = async (req, res) => {
    try {
        const user = await disabledUserService(req.params.id);

        return res.status(200).json({
            success: true,
            message: "User disabled successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await deleteUserService(req.params.id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, confirmPassword } = req.body;

        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password are required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        const user = await resetPasswordService({
            id,
            password,
        });

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
