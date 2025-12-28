const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance();

exports.getPrice = async (symbol) => {
    try {
        const quote = await yahooFinance.quote(symbol);
        return quote.regularMarketPrice;
    } catch (error) {
        console.error(`Yahoo Error (${symbol}):`, error.message);
        return null;
    }
};