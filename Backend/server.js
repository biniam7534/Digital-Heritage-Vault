const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Route files
const heritage = require('./routes/heritage');

// Mount routers
app.use('/api/v1/heritage', heritage);

// Basic route
app.get('/', (req, res) => {
    res.send('🏛️ Digital Heritage Vault API is running...');
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`❌ Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
