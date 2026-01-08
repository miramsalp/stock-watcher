const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const cache = new Map();
const CACHE_TTL = 60 * 1000; 

exports.getCurrentPrice = async (symbol) => {
    const now = Date.now();
    if (cache.has(symbol)) {
        const { price, timestamp } = cache.get(symbol);
        if (now - timestamp < CACHE_TTL) {
            console.log(`Using cached price for ${symbol}`);
            return price;
        }
    }

    try {
        const quote = await yahooFinance.quote(symbol);
        const price = quote.regularMarketPrice;
        
        cache.set(symbol, { price, timestamp: now });
        return price;
    } catch (error) {
        console.error(`Yahoo Error (${symbol}):`, error);
        return null;
    }
};