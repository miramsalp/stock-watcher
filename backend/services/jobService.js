const stockModel = require('../models/stockModel');
const yahooService = require('./yahooService');
const lineClient = require('../config/lineClient');
const { createStockAlertFlex } = require('../templates/stockAlertFlex'); 

exports.checkStocksAndNotify = async () => {
    console.log('⏳ Job Running: Checking stocks...');
    
    try {
        const stocks = await stockModel.getActiveStocks();

        for (const stock of stocks) {
            const { id, symbol, target_price, condition_type, user_id } = stock;
            const currentPrice = await yahooService.getCurrentPrice(symbol);

            if (!currentPrice) continue;

            let isTriggered = false;
            if (condition_type === 'above' && currentPrice >= target_price) isTriggered = true;
            else if (condition_type === 'below' && currentPrice <= target_price) isTriggered = true;

            if (isTriggered) {
                const flexMsg = createStockAlertFlex(stock, currentPrice);

                await lineClient.pushMessage(user_id, flexMsg);
                await stockModel.deleteAlert(id); 
                console.log(`Alert sent and deleted for ${symbol}`);
            }
        }
    } catch (error) {
        console.error('Job Error:', error.message);
    }
};