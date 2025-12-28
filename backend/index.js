require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 
const stockRoutes = require('./routes/stockRoutes');
const jobService = require('./services/jobService');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);

app.use(helmet());

const allowedOrigins = [
    'https://stock-watcher-vert.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: 'Too many requests, please try again later.'
});
app.use('/api/', limiter);

app.use(express.json());

app.use('/api/stocks', stockRoutes);

app.get('/', (req, res) => res.send('Server is running'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Start Job
    setInterval(() => jobService.checkStocksAndNotify(), 60000);
    jobService.checkStocksAndNotify();
});