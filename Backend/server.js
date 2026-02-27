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
app.use(cors({
    origin: "https://digital-heritage-vaul.vercel.app",
    credentials: true
}));

// Route files
const heritage = require('./routes/heritage');
const future = require('./routes/futureRoutes');
const artifacts = require('./routes/artifactRoutes');

// Mount routers
app.use('/api/v1/heritage', heritage);
app.use('/api/v1/future', future);
app.use('/api/v1/artifacts', artifacts);

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
