/**
 * Response Formatter Utility
 * Formats all API responses according to PDF requirements
 */

/**
 * Success response formatter
 * @param {number} status - HTTP status code
 * @param {string} msg - Success message
 * @param {*} data - Response data (can be null, object, or array)
 * @returns {object} Formatted response object
 */
const successResponse = (status, msg, data = null) => {
    return {
        status,
        msg,
        data
    };
};

/**
 * Error response formatter
 * @param {number} status - HTTP status code
 * @param {string} msg - Error message
 * @returns {object} Formatted error response
 */
const errorResponse = (status, msg) => {
    return {
        status,
        msg,
        data: null
    };
};

module.exports = {
    successResponse,
    errorResponse
};
