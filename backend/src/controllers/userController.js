const prisma = require('../config/prisma');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

/**
 * Add New User
 * POST /users/add
 * Request Body: { email, username }
 */
const addUser = async (req, res) => {
    try {
        const { email, username } = req.body;

        // Validation
        if (!email || !username) {
            return res.status(400).json(
                errorResponse(400, 'Email and username are required')
            );
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json(
                errorResponse(400, 'Email already exists')
            );
        }

        // Create new user
        await prisma.user.create({
            data: {
                email,
                username,
                isActive: false // Default value
            }
        });

        return res.status(200).json(
            successResponse(200, 'Success Add User', null)
        );

    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).json(
            errorResponse(500, 'Internal server error')
        );
    }
};

/**
 * Get All Users
 * GET /users
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                isActive: true
            },
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json(
            successResponse(200, 'Success', users)
        );

    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json(
            errorResponse(500, 'Internal server error')
        );
    }
};

/**
 * Get User by ID
 * GET /users/:userId
 */
const getUserById = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        if (isNaN(userId)) {
            return res.status(400).json(
                errorResponse(400, 'Invalid user ID')
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                isActive: true
            }
        });

        if (!user) {
            return res.status(404).json(
                errorResponse(404, 'User not found')
            );
        }

        return res.status(200).json(
            successResponse(200, 'Success', user)
        );

    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json(
            errorResponse(500, 'Internal server error')
        );
    }
};

/**
 * Update User Active Status
 * PUT /users/update/active
 * Request Body: { id, isActive }
 */
const updateUserActiveStatus = async (req, res) => {
    try {
        const { id, isActive } = req.body;

        // Validation
        if (id === undefined || isActive === undefined) {
            return res.status(400).json(
                errorResponse(400, 'ID and isActive are required')
            );
        }

        if (typeof isActive !== 'boolean') {
            return res.status(400).json(
                errorResponse(400, 'isActive must be a boolean')
            );
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!user) {
            return res.status(404).json(
                errorResponse(404, 'User not found')
            );
        }

        // Update user status
        await prisma.user.update({
            where: { id: parseInt(id) },
            data: { isActive }
        });

        return res.status(200).json(
            successResponse(200, 'Success Update Status', null)
        );

    } catch (error) {
        console.error('Error updating user status:', error);
        return res.status(500).json(
            errorResponse(500, 'Internal server error')
        );
    }
};

/**
 * Get Users with Pagination
 * GET /users/:limit/:page
 */
const getUsersWithPagination = async (req, res) => {
    try {
        const limit = parseInt(req.params.limit);
        const page = parseInt(req.params.page);

        // Validation
        if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
            return res.status(400).json(
                errorResponse(400, 'Invalid limit or page parameter')
            );
        }

        // Calculate offset
        const skip = (page - 1) * limit;

        // Get total count
        const totalData = await prisma.user.count();

        // Calculate max pages
        const max_page = Math.ceil(totalData / limit);

        // Get paginated users
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                isActive: true
            },
            skip,
            take: limit,
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json(
            successResponse(200, 'Success', {
                users,
                max_page,
                totalData
            })
        );

    } catch (error) {
        console.error('Error fetching paginated users:', error);
        return res.status(500).json(
            errorResponse(500, 'Internal server error')
        );
    }
};

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUserActiveStatus,
    getUsersWithPagination
};
