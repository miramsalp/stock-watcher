const finnhub = require('finnhub');
const finnhubClient = new finnhub.DefaultApi(process.env.FINNHUB_API_KEY);

const cache = new Map();
const CACHE_TTL = 60 * 1000; // 60 seconds

exports.getCurrentPrice = async (symbol) => {
    // Check cache
    const now = Date.now();
    if (cache.has(symbol)) {    
        const { price, timestamp } = cache.get(symbol);
        if (now - timestamp < CACHE_TTL) {
            console.log(`Using cached price for ${symbol}`);
            return price;
        }
    }

    return new Promise((resolve, reject) => {
        finnhubClient.quote(symbol, (error, data, response) => {
            if (error) {
                console.error(`Finnhub Error (${symbol}):`, error);
                resolve(null);
            } else {
                const price = data.c; 
                cache.set(symbol, { price, timestamp: now });
                resolve(price);
            }
        });
    });
};
