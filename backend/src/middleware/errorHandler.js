const { errorResponse } = require('../utils/responseFormatter');

/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Prisma specific errors
    if (err.code) {
        switch (err.code) {
            case 'P2002':
                return res.status(400).json(
                    errorResponse(400, 'Unique constraint violation')
                );
            case 'P2025':
                return res.status(404).json(
                    errorResponse(404, 'Record not found')
                );
            default:
                return res.status(500).json(
                    errorResponse(500, 'Database error')
                );
        }
    }

    // Default error
    return res.status(500).json(
        errorResponse(500, err.message || 'Internal server error')
    );
};

module.exports = errorHandler;
