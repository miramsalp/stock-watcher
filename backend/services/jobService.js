const stockModel = require('../models/stockModel');
const yahooService = require('./yahooService');
const lineService = require('./lineService');
const { createStockAlertFlex } = require('../templates/stockAlertFlex');

exports.checkStocksAndNotify = async () => {
    console.log('⏳ Job Running...');
    try {
        const stocks = await stockModel.getActiveStocks();
        if (!stocks || stocks.length === 0) return;

        for (const stock of stocks) {
            const currentPrice = await yahooService.getCurrentPrice(stock.symbol);
            if (!currentPrice) continue;

            let isTriggered = false;
            if (stock.condition_type === 'above' && currentPrice >= stock.target_price) isTriggered = true;
            else if (stock.condition_type === 'below' && currentPrice <= stock.target_price) isTriggered = true;

            if (isTriggered) {
                const flexMsg = createStockAlertFlex(stock, currentPrice);
                await lineService.sendPushMessage(stock.user_id, flexMsg);
                await stockModel.deleteAlert(stock.id); 
                console.log(`🎯 Alert Triggered: ${stock.symbol}`);
            }
        }
    } catch (error) {
        console.error('Job Error:', error.message);
    }
};