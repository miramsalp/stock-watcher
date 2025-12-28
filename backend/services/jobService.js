const stockModel = require('../models/stockModel');
const yahooService = require('./yahooService');
const lineClient = require('../config/lineClient');

exports.checkStocksAndNotify = async () => {
    console.log('⏳ Job Running: Checking stocks...');
    
    try {
        const stocks = await stockModel.getActiveStocks();

        for (const stock of stocks) {
            const { id, symbol, target_price, condition_type, user_id } = stock;
            const currentPrice = await yahooService.getCurrentPrice(symbol);

            if (!currentPrice) continue;

            let isTriggered = false;
            
            if (condition_type === 'above' && currentPrice >= target_price) {
                isTriggered = true;
            } else if (condition_type === 'below' && currentPrice <= target_price) {
                isTriggered = true;
            }

            if (isTriggered) {
                const emoji = condition_type === 'above' ? '🚀' : '🔻';
                const action = condition_type === 'above' ? 'Breakout (สูงกว่า)' : 'Dip (ต่ำกว่า)';
                
                const msg = {
                    type: 'text',
                    text: `${emoji} ${symbol} ${action} เป้าหมาย!\n💵 ราคาปัจจุบัน: $${currentPrice}\n🎯 เป้าหมาย: $${target_price}`
                };

                await lineClient.pushMessage(user_id, msg);
                await stockModel.disableAlert(id);
                console.log(`Alert sent for ${symbol}`);
            }
        }
    } catch (error) {
        console.error('Job Error:', error.message);
    }
};