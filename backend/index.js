require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stockRoutes = require('./routes/stockRoutes');
const jobService = require('./services/jobService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stocks', stockRoutes);
app.get('/', (req, res) => res.send('Stock Backend is Live! 🚀'));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    setInterval(() => {
        jobService.checkStocksAndNotify();
    }, 60000);

    jobService.checkStocksAndNotify();
});