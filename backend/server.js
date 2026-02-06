require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        status: 200,
        msg: 'TechRise Backend API - User Management',
        data: {
            endpoints: [
                'POST /users/add',
                'GET /users',
                'GET /users/:userId',
                'PUT /users/update/active',
                'GET /users/:limit/:page'
            ]
        }
    });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nShutting down gracefully...');
    process.exit(0);
});
