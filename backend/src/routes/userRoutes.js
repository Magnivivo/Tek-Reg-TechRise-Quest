const express = require('express');
const router = express.Router();
const {
    addUser,
    getAllUsers,
    getUserById,
    updateUserActiveStatus,
    getUsersWithPagination
} = require('../controllers/userController');

// 1. Add New User
router.post('/add', addUser);

// 2. Get All Users
router.get('/', getAllUsers);

// 4. Update User Active Status
router.put('/update/active', updateUserActiveStatus);

// 5. Get Users with Pagination (Optional) - Must come before /:userId
router.get('/:limit/:page', getUsersWithPagination);

// 3. Get User by ID (Must come after pagination route)
router.get('/:userId', getUserById);


module.exports = router;
